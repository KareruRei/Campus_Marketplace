<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Events\OrderStatusUpdated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of orders (Buyer view).
     */
    public function buyerOrders(Request $request)
    {
        $orders = Order::where('buyer_id', $request->user()->id)
            ->with(['seller', 'items.listing'])
            ->latest()
            ->get();

        return response()->json($orders);
    }

    /**
     * Display a listing of orders (Seller view).
     */
    public function sellerOrders(Request $request)
    {
        $orders = Order::where('seller_id', $request->user()->id)
            ->with(['buyer', 'items.listing'])
            ->latest()
            ->get();

        return response()->json($orders);
    }

    /**
     * Update the status of an order (Seller only).
     */
    public function update_status(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:PREPARING,PACKED,FOR PICKUP,COMPLETED',
        ]);

        $order = Order::where('seller_id', $request->user()->id)->findOrFail($id);
        
        $order->update(['status' => $request->status]);

        // Trigger Broadcast Event
        broadcast(new OrderStatusUpdated($order))->toOthers();

        return response()->json([
            'message' => 'Order status updated successfully.',
            'order' => $order
        ]);
    }
}

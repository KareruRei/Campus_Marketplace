<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\Listing;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    /**
     * Process the checkout for the authenticated user's cart.
     */
    public function process_checkout(CheckoutRequest $request)
    {
        $user = Auth::user();
        $cartItems = CartItem::with('listing')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty.'], 400);
        }

        // Group items by seller
        $itemsBySeller = $cartItems->groupBy(function($item) {
            return $item->listing->seller_id;
        });

        $orders = [];

        try {
            DB::beginTransaction();

            foreach ($itemsBySeller as $sellerId => $items) {
                $totalAmount = 0;
                foreach ($items as $item) {
                    if ($item->quantity > $item->listing->stock) {
                        throw new \Exception("Insufficient stock for item: " . $item->listing->title);
                    }
                    $totalAmount += $item->listing->price * $item->quantity;
                }

                // Create Order for this seller
                $order = Order::create([
                    'buyer_id' => $user->id,
                    'seller_id' => $sellerId,
                    'status' => 'PREPARING',
                    'total_amount' => $totalAmount,
                    'meetup_schedule' => $request->meetup_schedule,
                ]);

                foreach ($items as $item) {
                    // Create OrderItem
                    OrderItem::create([
                        'order_id' => $order->id,
                        'listing_id' => $item->listing_id,
                        'quantity' => $item->quantity,
                        'price_at_purchase' => $item->listing->price,
                    ]);

                    // Deduct stock
                    $item->listing->decrement('stock', $item->quantity);
                    
                    // Mark as Sold if stock is 0
                    if ($item->listing->refresh()->stock <= 0) {
                        $item->listing->update(['status' => 'Sold']);
                    }
                }

                $orders[] = $order->load('items.listing');
            }

            // Clear Cart
            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Checkout successful.',
                'orders' => $orders
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}

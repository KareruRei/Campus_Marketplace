<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Listing;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display the authenticated user's cart.
     */
    public function index(Request $request)
    {
        $cartItems = CartItem::where('user_id', $request->user()->id)
            ->with(['listing' => function($q) {
                $q->with('seller');
            }])
            ->get();

        return response()->json($cartItems);
    }

    /**
     * Add an item to the cart or increment quantity.
     */
    public function store(Request $request)
    {
        $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'quantity' => 'integer|min:1',
        ]);

        $listing = Listing::findOrFail($request->listing_id);
        $quantity = $request->quantity ?? 1;

        // Check if seller is trying to buy their own item
        if ($listing->seller_id === $request->user()->id) {
            return response()->json(['message' => 'You cannot add your own item to the cart.'], 403);
        }

        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->where('listing_id', $request->listing_id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $quantity;
            if ($newQuantity > $listing->stock) {
                return response()->json(['message' => 'Not enough stock available.'], 400);
            }
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            if ($quantity > $listing->stock) {
                return response()->json(['message' => 'Not enough stock available.'], 400);
            }
            $cartItem = CartItem::create([
                'user_id' => $request->user()->id,
                'listing_id' => $request->listing_id,
                'quantity' => $quantity,
            ]);
        }

        return response()->json($cartItem->load('listing'), 201);
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update_quantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('user_id', $request->user()->id)->findOrFail($id);
        $listing = $cartItem->listing;

        if ($request->quantity > $listing->stock) {
            return response()->json(['message' => 'Not enough stock available.'], 400);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json($cartItem);
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy($id, Request $request)
    {
        $cartItem = CartItem::where('user_id', $request->user()->id)->findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart.']);
    }
}

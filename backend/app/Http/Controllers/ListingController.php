<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Http\Resources\ListingResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ListingController extends Controller
{
    /**
     * Store a newly created listing in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:1',
            'condition' => 'required|in:New,Used',
            'hours_to_sell' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            // Save to storage/app/public/listings
            $imagePath = $request->file('image')->store('listings', 'public');
        }

        $listing = Listing::create([
            'seller_id' => $request->user()->id,
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'condition' => $request->condition,
            'image_path' => $imagePath,
            'expires_at' => Carbon::now()->addHours($request->hours_to_sell),
            'status' => 'Active',
        ]);

        return (new ListingResource($listing))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display listings belonging to the authenticated user.
     */
    public function myListings(Request $request)
    {
        $listings = Listing::where('seller_id', $request->user()->id)
            ->where('is_deleted', false)
            ->with(['category', 'seller'])
            ->latest()
            ->get();

        return ListingResource::collection($listings);
    }

    /**
     * Remove the specified listing (Soft delete logic).
     */
    public function destroy($id, Request $request)
    {
        $listing = Listing::where('seller_id', $request->user()->id)->findOrFail($id);
        $listing->update(['is_deleted' => true]);

        return response()->json(['message' => 'Listing removed successfully.']);
    }
}

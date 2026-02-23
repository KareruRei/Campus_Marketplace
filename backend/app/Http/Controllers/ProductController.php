<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Http\Resources\ListingResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of active products for the marketplace.
     */
    public function index(Request $request)
    {
        $query = Listing::with(['seller', 'category'])
            ->where('status', 'Active')
            ->where('is_deleted', false)
            ->where('expires_at', '>', now())
            ->where('stock', '>', 0);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $listings = $query->latest()->paginate(12);
        
        return ListingResource::collection($listings);
    }

    /**
     * Display the specified product details.
     */
    public function show($id)
    {
        $listing = Listing::with(['seller', 'category'])
            ->where('is_deleted', false)
            ->findOrFail($id);

        return new ListingResource($listing);
    }
}

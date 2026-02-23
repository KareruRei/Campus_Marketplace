<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Listing;
use App\Models\AdminLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Get system statistics for the dashboard.
     */
    public function stats()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_listings' => Listing::where('is_deleted', false)->count(),
            'total_orders' => \App\Models\Order::count(),
            'total_sales' => \App\Models\Order::where('status', 'COMPLETED')->sum('total_amount'),
        ]);
    }

    /**
     * Delete a listing (Admin override).
     */
    public function deleteListing($id)
    {
        $listing = Listing::findOrFail($id);
        $listing->update(['is_deleted' => true]);

        AdminLog::create([
            'admin_id' => Auth::id(),
            'action' => 'DELETE_LISTING',
            'target_type' => 'Listing',
            'target_id' => $id,
            'details' => "Deleted listing: " . $listing->title,
        ]);

        return response()->json(['message' => 'Listing deleted by admin.']);
    }

    /**
     * Ban a user.
     */
    public function banUser($id)
    {
        $user = User::findOrFail($id);
        if ($user->role === 'admin') {
            return response()->json(['message' => 'Cannot ban an admin.'], 403);
        }

        $user->update(['is_banned' => true]);

        AdminLog::create([
            'admin_id' => Auth::id(),
            'action' => 'BAN_USER',
            'target_type' => 'User',
            'target_id' => $id,
            'details' => "Banned user: " . $user->name,
        ]);

        return response()->json(['message' => 'User banned successfully.']);
    }
}

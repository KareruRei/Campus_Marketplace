<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Listing;
use App\Models\Order;
use App\Models\Report;
use App\Models\AdminLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Dashboard statistics.
     */
    public function stats()
    {
        return response()->json([
            'total_users'    => User::count(),
            'total_listings' => Listing::where('is_deleted', false)->count(),
            'total_orders'   => Order::count(),
            'total_sales'    => Order::where('status', 'COMPLETED')->sum('total_amount'),
        ]);
    }

    /**
     * List all users (paginated).
     */
    public function users()
    {
        $users = User::orderBy('created_at', 'desc')->get();

        return response()->json(['data' => $users]);
    }

    /**
     * List all listings with seller info.
     */
    public function listings()
    {
        $listings = Listing::with('seller:id,name,email', 'category:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $listings]);
    }

    /**
     * List all reports with reporter/reported info.
     */
    public function reports()
    {
        $reports = Report::with('reporter:id,name,email', 'reportedUser:id,name,email', 'listing:id,title')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $reports]);
    }

    /**
     * Update report status.
     */
    public function updateReport(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:Pending,Resolved,Dismissed']);

        $report = Report::findOrFail($id);
        $report->update(['status' => $request->status]);

        AdminLog::create([
            'admin_id'    => Auth::id(),
            'action'      => 'UPDATE_REPORT',
            'target_type' => 'Report',
            'target_id'   => $id,
            'details'     => "Updated report #{$id} status to {$request->status}",
        ]);

        return response()->json(['message' => 'Report updated.', 'data' => $report->fresh()]);
    }

    /**
     * List all admin logs.
     */
    public function logs()
    {
        $logs = AdminLog::with('admin:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['data' => $logs]);
    }

    /**
     * Delete a listing (admin override).
     */
    public function deleteListing($id)
    {
        $listing = Listing::findOrFail($id);
        $listing->update(['is_deleted' => true]);

        AdminLog::create([
            'admin_id'    => Auth::id(),
            'action'      => 'DELETE_LISTING',
            'target_type' => 'Listing',
            'target_id'   => $id,
            'details'     => "Deleted listing: " . $listing->title,
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
            'admin_id'    => Auth::id(),
            'action'      => 'BAN_USER',
            'target_type' => 'User',
            'target_id'   => $id,
            'details'     => "Banned user: " . $user->name,
        ]);

        return response()->json(['message' => 'User banned successfully.']);
    }

    /**
     * Unban a user.
     */
    public function unbanUser($id)
    {
        $user = User::findOrFail($id);
        $user->update(['is_banned' => false]);

        AdminLog::create([
            'admin_id'    => Auth::id(),
            'action'      => 'UNBAN_USER',
            'target_type' => 'User',
            'target_id'   => $id,
            'details'     => "Unbanned user: " . $user->name,
        ]);

        return response()->json(['message' => 'User unbanned successfully.']);
    }
}

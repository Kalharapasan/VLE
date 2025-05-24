<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminRequests;
use App\Models\Admin;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function store(AdminRequests $request)
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('admin_img')) {
                $data['admin_img'] = $request->file('admin_img')->store('admin_images', 'public');
            }

            $admin = Admin::create($data);

            return response()->json(['message' => 'Admin added successfully', 'admin' => $admin]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function index()
    {
        return response()->json(Admin::all());
    }

    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin);
    }

    public function update(AdminRequests $request, $id)
    {
        $admin = Admin::findOrFail($id);
        $admin->update($request->validated());

        return response()->json(['message' => 'Admin updated successfully', 'admin' => $admin]);
    }

    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);

        // Delete image file
        if ($admin->admin_img && Storage::disk('public')->exists($admin->admin_img)) {
            Storage::disk('public')->delete($admin->admin_img);
        }

        $admin->delete();

        return response()->json(['message' => 'Admin deleted successfully']);
    }
    // Get the count of all admins
    public function count()
    {
        $count = Admin::count();
        return response()->json(['admin_count' => $count]);
    }

    // Get only admin full names (you can change this to any attribute)
    public function names()
    {
        $names = Admin::select('admin_fname', 'admin_lname')->get();
        return response()->json(['admin_names' => $names]);
    }

    // Get specific attribute (e.g., emails)
    public function emails()
    {
        $emails = Admin::pluck('admin_email');
        return response()->json(['admin_emails' => $emails]);
    }

    public function getAttributeById($id, $attribute)
    {
        $admin = Admin::findOrFail($id);

        if (!array_key_exists($attribute, $admin->getAttributes())) {
         return response()->json(['message' => 'Attribute not found'], 404);
        }

        return response()->json([
            'admin_id' => $id,
            $attribute => $admin->$attribute
     ]);
    }


}

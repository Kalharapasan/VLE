<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminRequests;
use App\Models\Admin;

class AdminController extends Controller
{
    // CREATE
    public function store(AdminRequests $request)
    {
        try {
            $admin = Admin::create($request->validated());

            return response()->json(['message' => 'Admin added successfully', 'admin' => $admin]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // READ ALL
    public function index()
    {
        return response()->json(Admin::all());
    }

    // READ ONE
    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin);
    }

    // UPDATE
    public function update(AdminRequests $request, $id)
    {
        $admin = Admin::findOrFail($id);
        $admin->update($request->validated());

        return response()->json(['message' => 'Admin updated successfully', 'admin' => $admin]);
    }

    // DELETE
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json(['message' => 'Admin deleted successfully']);
    }
}

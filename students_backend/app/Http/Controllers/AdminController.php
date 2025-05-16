<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json(Admin::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'admin_fname' => 'required|string',
            'admin_lname' => 'required|string',
            'admin_birthday' => 'required|date',
            'admin_email' => 'required|email|unique:admins,admin_email',
            'admin_nic' => 'required|string|unique:admins,admin_nic',
            'admin_gender' => 'required|in:male,female,other',
            'admin_address' => 'required|string',
            'admin_img' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('admin_img')) {
            $validated['admin_img'] = $request->file('admin_img')->store('admins', 'public');
        }

        $admin = Admin::create($validated);
        return response()->json($admin, 201);
    }

    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin);
    }

    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $validated = $request->validate([
            'admin_fname' => 'required|string',
            'admin_lname' => 'required|string',
            'admin_birthday' => 'required|date',
            'admin_email' => 'required|email|unique:admins,admin_email,' . $admin->admin_id . ',admin_id',
            'admin_nic' => 'required|string|unique:admins,admin_nic,' . $admin->admin_id . ',admin_id',
            'admin_gender' => 'required|in:male,female,other',
            'admin_address' => 'required|string',
            'admin_img' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('admin_img')) {
            if ($admin->admin_img) {
                Storage::disk('public')->delete($admin->admin_img);
            }
            $validated['admin_img'] = $request->file('admin_img')->store('admins', 'public');
        }

        $admin->update($validated);
        return response()->json($admin);
    }

    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        if ($admin->admin_img) {
            Storage::disk('public')->delete($admin->admin_img);
        }
        $admin->delete();
        return response()->json(null, 204);
    }
}


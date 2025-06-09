<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequests;
use App\Models\Department;

class DepartmentController extends Controller
{
    // CREATE
    public function store(DepartmentRequests $request)
    {
        try {
            $department = Department::create($request->validated());

            return response()->json(['message' => 'Department added successfully', 'department' => $department]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // READ ALL
    public function index()
    {
        return response()->json(Department::all());
    }

    // READ ONE (with related faculty info)
    public function show($id)
    {
        return response()->json(Department::with('faculty')->findOrFail($id));
    }

    // UPDATE
    public function update(DepartmentRequests $request, $id)
    {
        $department = Department::findOrFail($id);
        $department->update($request->validated());

        return response()->json(['message' => 'Department updated successfully', 'faculty' => $department]);
    }

    // DELETE
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return response()->json(['message' => 'Department deleted successfully']);
    }
    public function get_id()
    {
        return Department::select('department_id', 'department_Index')->get();
    }

    public function count()
    {
        $count = Department::count();
        return response()->json(['department_count' => $count]);
    }

    // Get department name by ID
    public function getDepartmentNameById($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }

        return response()->json(['department_name' => $department->department_name]);
    }

    public function getDepartmentIdByName($name)
    {
        $department = Department::where('department_name', $name)->first();

        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }

        return response()->json([
            'department_id' => $department->department_id
        ]);
    }
    // ✅ Get Admin Index by ID (if you really need it here)
    public function getIndexById($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'department not found'], 404);
        }

        return response()->json([
            'department_Index' => $department->department_Index
        ]);
    }


}

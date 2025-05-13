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

    // READ ONE
    public function show($id)
    {
        $department = Department::findOrFail($id);
        return response()->json($department);
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
}

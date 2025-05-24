<?php

namespace App\Http\Controllers;

use App\Http\Requests\FacultyRequests;
use App\Models\Faculty;

class FacultyController extends Controller
{
    // CREATE
    public function store(FacultyRequests $request)
    {
        try {
            $faculty = Faculty::create($request->validated());

            return response()->json(['message' => 'Faculty added successfully', 'faculty' => $faculty]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // READ ALL
    public function index()
    {
        return response()->json(Faculty::all());
    }

    // READ ONE
    public function show($id)
    {
        $faculty = Faculty::findOrFail($id);
        return response()->json($faculty);
    }

    // UPDATE
    public function update(FacultyRequests $request, $id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->update($request->validated());

        return response()->json(['message' => 'Faculty updated successfully', 'faculty' => $faculty]);
    }

    // DELETE
    public function destroy($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->delete();

        return response()->json(['message' => 'Faculty deleted successfully']);
    }
}

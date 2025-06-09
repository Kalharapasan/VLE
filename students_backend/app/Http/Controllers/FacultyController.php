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

            return response()->json([
                'message' => 'Faculty added successfully',
                'faculty' => $faculty
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
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

        return response()->json([
            'message' => 'Faculty updated successfully',
            'faculty' => $faculty
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $faculty = Faculty::findOrFail($id);
        $faculty->delete();

        return response()->json([
            'message' => 'Faculty deleted successfully'
        ]);
    }

    // GET ID & INDEX
    public function get_id()
    {
        return Faculty::select('faculties_id', 'faculties_Index')->get();
    }

    // COUNT
    public function count()
    {
        $count = Faculty::count();
        return response()->json([
            'faculty_count' => $count
        ]);
    }

    // ✅ Get Faculty ID by Name
    public function getFacultyIdByName($name)
    {
        $faculty = Faculty::where('faculties_name', $name)->first();

        if (!$faculty) {
            return response()->json(['message' => 'Faculty not found'], 404);
        }

        return response()->json([
            'faculties_id' => $faculty->faculties_id
        ]);
    }

    // ✅ Get Faculty Name by ID
    public function getFacultyNameById($id)
    {
        $faculty = Faculty::find($id);

        if (!$faculty) {
            return response()->json(['message' => 'Faculty not found'], 404);
        }

        return response()->json([
            'faculties_name' => $faculty->faculties_name
        ]);
    }
    // ✅ Get Admin Index by ID (if you really need it here)
    public function getIndexById($id)
    {
        $faculty = Faculty::find($id);

        if (!$faculty) {
            return response()->json(['message' => 'faculty not found'], 404);
        }

        return response()->json([
            'faculties_Index' => $faculty->faculties_Index
        ]);
    }
}

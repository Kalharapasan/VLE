<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequests;
use App\Models\Teacher;
use Illuminate\Support\Facades\Storage;

class TeacherController extends Controller
{
    // CREATE
    public function store(TeacherRequests $request)
    {
        try {
            $teacher = Teacher::create($request->validated());

            return response()->json(['message' => 'Teacher added successfully', 'teacher' => $teacher]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // READ ALL
    public function index()
    {
        return response()->json(Teacher::all());
    }

    // READ ONE
    public function show($id)
    {
        $teacher = Teacher::findOrFail($id);
        return response()->json($teacher);
    }

    // UPDATE
    public function update(TeacherRequests $request, $id)
    {
        $teacher = Teacher::findOrFail($id);

        // Get validated data, but exclude the image for now
        $validatedData = $request->safe()->except('teacher_img');

        // Handle image upload separately
        if ($request->hasFile('teacher_img')) {
            // Optional: Delete the old image to save space
            if ($teacher->teacher_img) {
                Storage::disk('public')->delete($teacher->teacher_img);
            }
            // Store the new image and get the path
            $path = $request->file('teacher_img')->store('teacher_images', 'public');
            // Add the new image path to our data
            $validatedData['teacher_img'] = $path;
        }

        // Update the teacher with the new data
        $teacher->update($validatedData);

        return response()->json(['message' => 'Teacher updated successfully', 'teacher' => $teacher]);
    }

    // DELETE
    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return response()->json(['message' => 'Teacher deleted successfully']);
    }

    // COUNT
    public function count()
    {
        $count = Teacher::count();
        return response()->json(['teacher_count' => $count]);
    }

    // ✅ Get teacher ID by full name (e.g., "Amal Perera")
    public function getTeacherIdByName($name)
    {
        $parts = explode(' ', $name, 2); // fname & lname

        if (count($parts) < 2) {
            return response()->json(['message' => 'Please provide full name (first and last).'], 400);
        }

        $fname = $parts[0];
        $lname = $parts[1];

        $teacher = Teacher::where('teacher_fname', $fname)
                          ->where('teacher_lname', $lname)
                          ->first();

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        return response()->json(['teacher_id' => $teacher->teacher_id]);
    }

    // ✅ Get teacher full name by ID
    public function getTeacherNameById($id)
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        $fullName = $teacher->teacher_fname . ' ' . $teacher->teacher_lname;

        return response()->json(['teacher_name' => $fullName]);
    }
    public function getIndexById($id)
    {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            return response()->json(['message' => 'teacher not found'], 404);
        }

        return response()->json([
            'teacher_Index' => $teacher->teacher_Index
        ]);
    }
}

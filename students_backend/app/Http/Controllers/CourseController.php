<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequests;
use App\Models\Course;

class CourseController extends Controller
{
    // CREATE
    public function store(CourseRequests $request)
    {
        try {
            $course = Course::create($request->validated());

            return response()->json(['message' => 'Course added successfully', 'course' => $course]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // READ ALL
    public function index()
    {
        return response()->json(Course::all());
    }

    // READ ONE
    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json($course);
    }

    // UPDATE
    public function update(CourseRequests $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->validated());

        return response()->json(['message' => 'Course updated successfully', 'faculty' => $course]);
    }

    // DELETE
    public function destroy($id)
    {
        $course = course::findOrFail($id);
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequests;
use App\Models\Course;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    // CREATE
    public function store(CourseRequests $request)
    {
        try {
            $data = $request->validated();
            unset($data['img']);

            if ($request->hasFile('img')) {
                $data['img'] = $request->file('img')->store('course_images', 'public');
            }

            $course = Course::create($data);

            return response()->json([
                'message' => 'Course added successfully',
                'course' => $course
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
        $data = $request->validated();
        unset($data['img']);

        if ($request->hasFile('img')) {
            if ($course->img && Storage::disk('public')->exists($course->img)) {
                Storage::disk('public')->delete($course->img);
            }

            $data['img'] = $request->file('img')->store('course_images', 'public');
        }

        $course->update($data);

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        if ($course->img && Storage::disk('public')->exists($course->img)) {
            Storage::disk('public')->delete($course->img);
        }
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }

    // COUNT
    public function count()
    {
        $count = Course::count();
        return response()->json(['course_count' => $count]);
    }

    // ✅ Get Course ID by Name
    public function getCourseIdByName($name)
    {
        $course = Course::where('course_name', $name)->first();

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json([
            'course_id' => $course->course_id
        ]);
    }

    // ✅ Get Course Name by ID
    public function getCourseNameById($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json([
            'course_name' => $course->course_name
        ]);
    }
   // ✅ Get Admin Index by ID (if you really need it here)
    public function getIndexById($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json([
            'course_Index' => $course->course_Index
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequests;
use App\Models\Student;

class StudentController extends Controller
{
    // CREATE
    public function store(StudentRequests $request)
    {
        try {
            $student = Student::create($request->validated());

            return response()->json([
                'message' => 'Student added successfully',
                'student' => $student
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
        return response()->json(Student::all());
    }

    // READ ONE
    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    // UPDATE
    public function update(StudentRequests $request, $id)
    {
        $student = Student::findOrFail($id);
        $student->update($request->validated());

        return response()->json([
            'message' => 'Student updated successfully',
            'student' => $student
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully'
        ]);
    }

    // COUNT
    public function count()
    {
        $count = Student::count();
        return response()->json([
            'student_count' => $count
        ]);
    }

    // ✅ Get student ID by full name (e.g., "Kamal Perera")
    public function getStudentIdByName($name)
    {
        $parts = explode(' ', $name, 2); // Split into fname and lname

        if (count($parts) < 2) {
            return response()->json(['message' => 'Please provide full name (first and last).'], 400);
        }

        $fname = $parts[0];
        $lname = $parts[1];

        $student = Student::where('student_fname', $fname)
                          ->where('student_lname', $lname)
                          ->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json(['student_id' => $student->student_id]);
    }

    // ✅ Get full name by student ID
    public function getStudentNameById($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $fullName = $student->student_fname . ' ' . $student->student_lname;

        return response()->json(['student_name' => $fullName]);
    }
    // ✅ Get Admin Index by ID (if you really need it here)
    public function getIndexById($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json([
            'student_Index' => $student->student_Index
        ]);
    }
}

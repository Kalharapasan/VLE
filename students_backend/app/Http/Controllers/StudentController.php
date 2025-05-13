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

            return response()->json(['message' => 'Student added successfully', 'student' => $student]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // READ ALL
    public function index()
    {
        return response()->json(student::all());
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

        return response()->json(['message' => 'Student updated successfully', 'student' => $student]);
    }

    // DELETE
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequests;
use App\Models\Student;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    // CREATE
    public function store(StudentRequests $request)
    {
        try {
            $data = $request->validated();
            unset($data['studen_img']);

            if ($request->hasFile('studen_img')) {
                $data['studen_img'] = $request->file('studen_img')->store('student_images', 'public');
            }

            $student = Student::create($data);

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
        return response()->json(Student::with(['faculty', 'department'])->get());
    }

    // READ ONE
    public function show($id)
    {
        $student = Student::with(['faculty', 'department'])->findOrFail($id);
        return response()->json($student);
    }

    // UPDATE
    public function update(StudentRequests $request, $id)
    {
        $student = Student::findOrFail($id);
        $data = $request->validated();
        unset($data['studen_img']);

        if ($request->hasFile('studen_img')) {
            if ($student->studen_img && Storage::disk('public')->exists($student->studen_img)) {
                Storage::disk('public')->delete($student->studen_img);
            }

            $data['studen_img'] = $request->file('studen_img')->store('student_images', 'public');
        }

        $student->update($data);

        return response()->json([
            'message' => 'Student updated successfully',
            'student' => $student
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        if ($student->studen_img && Storage::disk('public')->exists($student->studen_img)) {
            Storage::disk('public')->delete($student->studen_img);
        }
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

    // ✅ Get student by index number
    public function getByIndex($index)
    {
        $student = Student::where('student_Index', $index)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json($student);
    }
}

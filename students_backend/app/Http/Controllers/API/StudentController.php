<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:students',
            'password' => 'required|string|min:8',
            'nic' => 'required|string|unique:students',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $student = Student::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nic' => $request->nic,
            'gender' => $request->gender,
            'address' => $request->address,
            'img' => $request->img,
            'description' => $request->description,
        ]);

        $token = $student->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Student registered successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $student = Student::where('email', $request->email)->first();

        if (!$student || !Hash::check($request->password, $student->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $student->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function getProfile()
    {
        return response()->json(auth()->user());
    }

    public function updateProfile(Request $request)
    {
        $student = auth()->user();

        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:students,email,'.$student->id,
            'nic' => 'string|unique:students,nic,'.$student->id,
            'gender' => 'in:male,female,other',
            'address' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $student->update($request->all());

        return response()->json([
            'message' => 'Profile updated successfully',
            'student' => $student
        ]);
    }

    public function enrollCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $student = auth()->user();
        $student->courses()->attach($request->course_id);

        return response()->json([
            'message' => 'Enrolled in course successfully'
        ]);
    }

    public function getGPA()
    {
        $student = auth()->user();
        $gpa = $student->gpa()->with('course')->get();

        return response()->json([
            'gpa' => $gpa
        ]);
    }

    public function getAttendance()
    {
        $student = auth()->user();
        $attendance = $student->attendance()->with('subject')->get();

        return response()->json([
            'attendance' => $attendance
        ]);
    }

    public function getExamMarks()
    {
        $student = auth()->user();
        $examMarks = $student->examMarks()->with(['exam', 'exam.subject'])->get();

        return response()->json([
            'exam_marks' => $examMarks
        ]);
    }
}

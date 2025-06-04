<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherRequests;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $teacher->update($request->validated());

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

    // GET PROFILE BY INDEX
    public function getProfileByIndex($index)
    {
        $teacher = Teacher::where('teacher_Index', $index)->first();

        if (!$teacher) {
            return response()->json(['error' => 'Teacher not found'], 404);
        }

        return response()->json($teacher);
    }

    // AUTHENTICATED PROFILE (Only allowed fields returned)
    public function profile(Request $request)
    {
        $user = Auth::user();

        $teacher = Teacher::where('teacher_email', $user->email)->first();

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        return response()->json([
            'teacher_Index'     => $teacher->teacher_Index,
            'teacher_fname'     => $teacher->teacher_fname,
            'teacher_lname'     => $teacher->teacher_lname,
            'teacher_birthday'  => $teacher->teacher_birthday,
            'teacher_email'     => $teacher->teacher_email,
            'teacher_nic'       => $teacher->teacher_nic,
            'teacher_gender'    => $teacher->teacher_gender,
            'faculties_id'      => $teacher->faculties_id,
            'department_id'     => $teacher->department_id,
            'teacher_img'       => $teacher->teacher_img,
        ]);
    }

    // PROFILE UPDATE (Without description)
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $teacher = Teacher::where('teacher_email', $user->email)->first();

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }

        $request->validate([
            'teacher_fname'    => 'required|string|max:255',
            'teacher_lname'    => 'required|string|max:255',
            'teacher_birthday' => 'nullable|date',
            'teacher_gender'   => 'nullable|string',
        ]);

        $teacher->update($request->only([
            'teacher_fname',
            'teacher_lname',
            'teacher_birthday',
            'teacher_gender',
        ]));

        return response()->json([
            'message' => 'Profile updated successfully',
            'teacher' => $teacher->only([
                'teacher_Index',
                'teacher_fname',
                'teacher_lname',
                'teacher_birthday',
                'teacher_email',
                'teacher_nic',
                'teacher_gender',
                'faculties_id',
                'department_id',
                'teacher_img',
            ]),
        ]);
    }
}

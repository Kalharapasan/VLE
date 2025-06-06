<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TeacherStudent;

class TeacherStudentController extends Controller
{
    public function index()
    {
        $relations = TeacherStudent::with(['teacher', 'student'])->get();
        return response()->json($relations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'student_id' => 'required|exists:students,id',
        ]);

        $relation = TeacherStudent::create($request->only(['teacher_id', 'student_id']));
        return response()->json($relation, 201);
    }

    public function destroy($id)
    {
        $relation = TeacherStudent::findOrFail($id);
        $relation->delete();

        return response()->json(['message' => 'Relation deleted']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'student_id' => 'required|exists:students,id',
        ]);

        $relation = TeacherStudent::findOrFail($id);
        $relation->update($request->only(['teacher_id', 'student_id']));

        return response()->json([
            'message' => 'Relation updated successfully',
            'data' => $relation
        ]);
    }
}

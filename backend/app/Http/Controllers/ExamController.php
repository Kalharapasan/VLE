<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamRequests;
use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{

    public function store(ExamRequests $request)
    {
        try {
            $exam = Exam::create($request->validated());

            return response()->json(['message' => 'Exam added successfully', 'exam' => $exam]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function index()
    {
        return response()->json(Exam::all());
    }

    public function show($id)
    {
        $exam = Exam::findOrFail($id);
        return response()->json($exam);
    }

    public function update(ExamRequests $request, $id)
    {
        $exam = Exam::findOrFail($id);
        $exam->update($request->validated());

        return response()->json(['message' => 'Exam updated successfully', 'exam' => $exam]);
    }

    public function destroy($id)
    {
        $exam = Exam::findOrFail($id);
        $exam->delete();

        return response()->json(['message' => 'Exam deleted successfully']);
    }
    public function count()
    {
        $count = Exam::count();
        return response()->json(['exam_count' => $count]);
    }
}

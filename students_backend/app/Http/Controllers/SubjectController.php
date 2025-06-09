<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequests;
use App\Models\Subject;

class SubjectController extends Controller
{
    // CREATE
    public function store(SubjectRequests $request)
    {
        try {
            $subject = Subject::create($request->validated());

            return response()->json([
                'message' => 'Subject added successfully',
                'subject' => $subject
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
        return response()->json(Subject::all());
    }

    // READ ONE
    public function show($id)
    {
        $subject = Subject::findOrFail($id);
        return response()->json($subject);
    }

    // UPDATE
    public function update(SubjectRequests $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $subject->update($request->validated());

        return response()->json([
            'message' => 'Subject updated successfully',
            'subject' => $subject
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();

        return response()->json(['message' => 'Subject deleted successfully']);
    }

    // COUNT
    public function count()
    {
        $count = Subject::count();
        return response()->json(['subject_count' => $count]);
    }

    // ✅ Get Subject ID by Name
    public function getSubjectIdByName($name)
    {
        $subject = Subject::where('subject_name', $name)->first();

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        return response()->json([
            'subject_id' => $subject->subject_id
        ]);
    }

    // ✅ Get Subject Name by ID
    public function getSubjectNameById($id)
    {
        $subject = Subject::find($id);

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        return response()->json([
            'subject_name' => $subject->subject_name
        ]);
    }
    // ✅ Get Admin Index by ID (if you really need it here)
    public function getIndexById($id)
    {
        $subject = Subject::find($id);

        if (!$subject) {
            return response()->json(['message' => 'subject not found'], 404);
        }

        return response()->json([
            'subject_Index' => $subject->subject_Index
        ]);
    }
}

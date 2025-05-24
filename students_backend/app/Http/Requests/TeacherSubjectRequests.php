<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Teacher;
use App\Models\Subject;

class TeacherSubjectRequests extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'subject_id'    => 'required|exists:subjects,subject_id',
            'teacher_id' => 'required|exists:teachers,teacher_id',
        ];
    }
    public function teachers()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'teacher_id');
    }
    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
}

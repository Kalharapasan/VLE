<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Subject;
use App\Models\Student;

class StudentExamMarksRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'subject_id'  => 'required|exists:subjects,subject_id',
            'student_id'  => 'required|exists:students,student_id',
            'mark'        => 'required|integer|min:0|max:100',
            'garde'       => 'required|string|max:5', // Assuming it's something like A, B, C...
        ];
    }
    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

}

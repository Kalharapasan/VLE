<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Exam;
use App\Models\Student;


class StudentExamRequests extends FormRequest
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
            'exam_id'    => 'required|exists:exams,exam_id',
            'student_id' => 'required|exists:students,student_id',
        ];
    }
    public function exams()
    {
        return $this->belongsTo(Exam::class, 'exam_id', 'exam_id');
    }
    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }
}

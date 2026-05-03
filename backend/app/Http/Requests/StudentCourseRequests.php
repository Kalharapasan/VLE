<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Course;
use App\Models\Student;

class StudentCourseRequests extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'course_id'  => 'required|exists:courses,course_id',
            'student_id' => 'required|exists:students,student_id',
        ];
    }
    public function courses()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
    public function students()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }
}

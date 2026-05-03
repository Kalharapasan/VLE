<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Course;
use App\Models\Teacher;

class TeacherCourseRequests extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [

            'course_id'  => 'required|exists:courses,course_id',
            'teacher_id' => 'required|exists:teachers,teacher_id',

        ];
    }
    public function courses()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
    public function teachers()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'teacher_id');
    }

}

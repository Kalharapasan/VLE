<?php

namespace App\Http\Requests;
use App\Models\Subject;
use App\Models\Course;

use Illuminate\Foundation\Http\FormRequest;

class SubjectCourseRequests extends FormRequest
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
            'subject_id' => 'required|exists:subjects,subject_id',
            'course_id'  => 'required|exists:courses,course_id',
        ];
    }
    public function subjects()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
    public function courses()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
}

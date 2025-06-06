<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Faculty;
use App\Models\Department;

class TeacherRequests extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules()
        {
            return [
            'teacher_fname' => 'required|string|max:255',
            'teacher_lname' => 'required|string|max:255',
            'teacher_email' => 'required|email',
            'teacher_nic' => 'required|string',
            'teacher_gender' => 'required|in:Male,Female',
            'teacher_birthday' => 'required|date',
            'faculties_id' => 'required|exists:faculties,id',
            'department_id' => 'required|exists:departments,id',
            'teacher_img' => 'nullable|image|max:2048',
        ];
    }

    public function faculties()
    {
        return $this->belongsTo(Faculty::class, 'faculties_id', 'faculties_id');
    }

    public function departments()
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }
}

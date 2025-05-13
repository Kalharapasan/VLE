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


    public function rules(): array
    {
        return [
            'teacher_fname'     => 'required|string|max:255',
            'teacher_lname'     => 'required|string|max:255',
            'teacher_birthday'  => 'required|date',
            'teacher_email'     => 'required|email|unique:students,student_email',
            'teacher_nic'       => 'required|string|max:20|unique:students,student_nic',
            'teacher_gender'    => 'required|in:male,female,other',
            'faculties_id'      => 'required|exists:faculties,faculties_id',
            'department_id'     => 'required|exists:departments,department_id',
            'teacher_img'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
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

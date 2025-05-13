<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Faculty;
use App\Models\Department;

class StudentRequests extends FormRequest
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
            'student_fname'     => 'required|string|max:255',
            'student_lname'     => 'required|string|max:255',
            'student_birthday'  => 'required|date',
            'student_email'     => 'required|email|unique:students,student_email',
            'student_nic'       => 'required|string|max:20|unique:students,student_nic',
            'student_gender'    => 'required|in:male,female,other',
            'faculties_id'      => 'required|exists:faculties,faculties_id',
            'department_id'     => 'required|exists:departments,department_id',
            'studen_img'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
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

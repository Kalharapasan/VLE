<?php

namespace App\Http\Requests;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Foundation\Http\FormRequest;

class TimeTableRequests extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'year'=> 'required|string|max:255',
            'accedamic_year'=> 'required|string|max:255',
            'semester' => 'required|string|max:255',
            'faculties_id'      => 'required|exists:faculties,faculties_id',
            'department_id'     => 'required|exists:departments,department_id',
            'monday'=> 'required|string|max:255',
            'tuday'=> 'required|string|max:255',
            'wenday'=> 'required|string|max:255',
            'theday'=> 'required|string|max:255',
            'friday'=> 'required|string|max:255',
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

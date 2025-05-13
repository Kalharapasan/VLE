<?php

namespace App\Http\Requests;

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
            'monday'=> 'required|string|max:255',
            'tuday'=> 'required|string|max:255',
            'wenday'=> 'required|string|max:255',
            'theday'=> 'required|string|max:255',
            'friday'=> 'required|string|max:255',
        ];
    }
}

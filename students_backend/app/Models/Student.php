<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_id';

    protected $fillable = [
        'student_Index',
        'student_fname',
        'student_lname',
        'student_birthday',
        'student_email',
        'student_nic',
        'student_gender',
        'faculties_id',
        'department_id',
        'studen_img',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $latestStudent = self::orderBy('student_id', 'desc')->first();

            if ($latestStudent && !empty($latestStudent->student_Index)) {
                $latestID = intval(substr($latestStudent->student_Index, 4));
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $newIndex = 'STUD' . str_pad($nextID, 4, '0', STR_PAD_LEFT);

            // Ensure uniqueness of student_Index
            while (self::where('student_Index', $newIndex)->exists()) {
                $nextID++;
                $newIndex = 'STUD' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }

            $model->student_Index = $newIndex;
        });
    }
}


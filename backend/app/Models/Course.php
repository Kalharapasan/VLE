<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $primaryKey = 'course_id';

    protected $fillable = [
        'course_Index',
        'course_name',
        'description',
        'faculties_id',
        'department_id',
        'img',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getCourse = self::orderBy('course_id', 'desc')->first(); // Fixed variable name from $getAdmin to $getCourse
            if ($getCourse) {
                $latestID = intval(substr($getCourse->course_id, 3)); // Fixed 'admin_Index' to 'course_id'
                $nextID = $latestID + 1;
            } else {
                $nextID = 1; 
            }

            $model->course_Index = 'COUR' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Fixed 'assingment_Index' to 'course_Index'
            while (self::where('course_Index', $model->course_Index)->exists()) { // Fixed 'course_id' to 'course_Index'
                $nextID++;
                $model->course_Index = 'COUR' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Fixed 'assingment_Index' to 'course_Index'
            }
        });
    }
}
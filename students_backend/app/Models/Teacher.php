<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $primaryKey = 'teacher_id';

    protected $fillable = [
        'teacher_Index',
        'teacher_fname',
        'teacher_lname',
        'teacher_birthday',
        'teacher_email',
        'teacher_nic',
        'teacher_gender',
        'faculties_id',
        'department_id',
        'teacher_img',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getTeacher = self::orderBy('teacher_id', 'desc')->first(); 
            if ($getTeacher) {
                $latestID = intval(substr($getTeacher->teacher_Index, 4)); 
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->teacher_Index = 'TEAC' . str_pad($nextID, 4, '0', STR_PAD_LEFT); 
            while (self::where('teacher_Index', $model->teacher_Index)->exists()) { 
                $nextID++;
                $model->teacher_Index = 'TEAC' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
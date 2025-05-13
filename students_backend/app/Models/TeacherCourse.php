<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherCourse extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'course_id',
        'teacher_id',
    ];
}

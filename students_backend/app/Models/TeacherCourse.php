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

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'teacher_id')
            ->select(['teacher_id', 'teacher_Index', 'teacher_fname']);
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id')
            ->select(['course_id', 'course_name']);
    }
    
}

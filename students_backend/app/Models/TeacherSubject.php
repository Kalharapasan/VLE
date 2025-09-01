<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherSubject extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'subject_id',
        'teacher_id',
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'teacher_id')
            ->select(['teacher_id', 'teacher_Index', 'teacher_fname']);
    }
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id')
            ->select(['subject_id', 'subject_name']);
    }
}

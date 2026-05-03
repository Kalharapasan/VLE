<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentExam extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'exam_id',
        'student_id',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentExamMarks extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'subject_id',
        'student_id',
        'mark',
        'garde',
    ];
}

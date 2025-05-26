<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAttendance extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';

    protected $fillable = [
        'student_id',
        'subject_id',
        'attendance',
        'date',
    ];
}

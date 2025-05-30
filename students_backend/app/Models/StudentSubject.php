<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSubject extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'student_id',
        'subject_id',
    ];
}

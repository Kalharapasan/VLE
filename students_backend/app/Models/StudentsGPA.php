<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentsGPA extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'student_id',
        'gpa',
    ];
}

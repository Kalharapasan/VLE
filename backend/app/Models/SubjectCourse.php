<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectCourse extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'subject_id',
        'course_id',
    ];

}

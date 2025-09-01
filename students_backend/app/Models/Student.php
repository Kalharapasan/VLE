<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Student extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'nic',
        'gender',
        'address',
        'img',
        'description',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    // Get full name
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    // Relationships
    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'student_subjects');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'student_courses');
    }

    public function attendance()
    {
        return $this->hasMany(StudentAttendance::class);
    }

    public function examMarks()
    {
        return $this->hasMany(StudentExamMarks::class);
    }

    public function gpa()
    {
        return $this->hasMany(StudentsGPA::class);
    }
}


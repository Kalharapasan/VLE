<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $primaryKey = 'department_id';

    protected $fillable = [
        'department_Index',
        'department_name',
        'description',
        'faculties_id',
        'img',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getDepartment = self::orderBy('department_id', 'desc')->first(); // Fixed variable name from $getCourse to $getDepartment
            if ($getDepartment) {
                $latestID = intval(substr($getDepartment->department_id, 3)); // Fixed 'course_id' to 'department_id'
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->department_Index = 'DEPT' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Generate department_Index
            while (self::where('department_Index', $model->department_Index)->exists()) { // Fixed 'course_Index' to 'department_Index'
                $nextID++;
                $model->department_Index = 'DEPT' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Generate department_Index
            }
        });
    }
}

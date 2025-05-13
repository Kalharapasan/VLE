<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $primaryKey = 'student_id';

    protected $fillable = [
        'student_Index',
        'student_fname',
        'student_lname',
        'student_birthday',
        'student_email',
        'student_nic',
        'student_gender',
        'faculties_id',
        'department_id',
        'studen_img',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getPasspaper = self::orderBy('passpapers_id', 'desc')->first(); // Fixed variable name to $getPasspaper
            if ($getPasspaper) {
                $latestID = intval(substr($getPasspaper->passpapers_Index, 4)); // Extract numeric part from passpapers_Index
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->passpapers_Index = 'PASS' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Generate passpapers_Index
            while (self::where('passpapers_Index', $model->passpapers_Index)->exists()) { // Check for duplicate passpapers_Index
                $nextID++;
                $model->passpapers_Index = 'PASS' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }

}

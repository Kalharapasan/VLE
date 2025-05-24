<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $primaryKey = 'exam_id';

    protected $fillable = [
        'exam_Index',
        'exam_name',
        'exam_start_date',
        'exam_end_date',
        'faculties_id',
        'department_id',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getExam = self::orderBy('exam_id', 'desc')->first();
            if ($getExam) {
                $latestID = intval(substr($getExam->exam_Index, 4)); 
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->exam_Index = 'EXAM' . str_pad($nextID, 4, '0', STR_PAD_LEFT); 
            while (self::where('exam_Index', $model->exam_Index)->exists()) { 
                $nextID++;
                $model->exam_Index = 'EXAM' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
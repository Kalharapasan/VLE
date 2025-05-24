<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $primaryKey = 'subject_id';

    protected $fillable = [
        'subject_Index',
        'subject_name',
        'description',
        'img',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getSubject = self::orderBy('subject_id', 'desc')->first(); // Fixed variable name to $getSubject
            if ($getSubject) {
                $latestID = intval(substr($getSubject->subject_Index, 4)); // Extract numeric part from subject_Index
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->subject_Index = 'SUBJ' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Generate subject_Index
            while (self::where('subject_Index', $model->subject_Index)->exists()) { // Check for duplicate subject_Index
                $nextID++;
                $model->subject_Index = 'SUBJ' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
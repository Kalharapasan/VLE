<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assingment extends Model
{
    use HasFactory;

    protected $primaryKey = 'assingment_id';

    protected $fillable = [
        'assingment_Index',
        'assingment_name',
        'assingment_start_date',
        'assingment_end_date',
        'document',
        'description',
        'subject_id',
        'teacher_id',
        'img',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getAssingment = self::orderBy('assingment_id', 'desc')->first(); 
            if ($getAssingment) {
                $latestID = intval(substr($getAssingment->assingment_Index, 5)); // Fixed 'admin_Index' to 'assingment_Index'
                $nextID = $latestID + 1;
            } else {
                $nextID = 1; 
            }

            $model->assingment_Index = 'ASSIN' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Generate assingment_Index
            while (self::where('assingment_Index', $model->assingment_Index)->exists()) { // Fixed 'assingment_id' to 'assingment_Index'
                $nextID++;
                $model->assingment_Index = 'ASSIN' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
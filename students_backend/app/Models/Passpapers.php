<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passpapers extends Model
{
    use HasFactory;

    protected $primaryKey = 'passpapers_id';

    protected $fillable = [
        'passpapers_Index',
        'subject_id',
        'document',
        'description',
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
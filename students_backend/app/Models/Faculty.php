<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $primaryKey = 'faculties_id';

    protected $fillable = [
        'faculties_Index',
        'faculties_name',
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getFaculty = self::orderBy('faculties_id', 'desc')->first(); // Fixed variable name to $getFaculty
            if ($getFaculty) {
                $latestID = intval(substr($getFaculty->faculties_Index, 4)); // Extract numeric part from faculties_Index
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->faculties_Index = 'FACU' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Generate faculties_Index
            while (self::where('faculties_Index', $model->faculties_Index)->exists()) { // Check for duplicate faculties_Index
                $nextID++;
                $model->faculties_Index = 'FACU' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
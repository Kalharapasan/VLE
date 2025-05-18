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

        static::creating(function ($faculty) {
            $latestFaculty = self::orderBy('faculties_id', 'desc')->first();
            $lastIndex = $latestFaculty ? intval(substr($latestFaculty->faculties_Index, 4)) : 0;

            $attempts = 0;

            do {
                $nextIndex = $lastIndex + 1;
                $faculty->faculties_Index = 'FACU' . str_pad($nextIndex, 4, '0', STR_PAD_LEFT);
                $lastIndex = $nextIndex;
                $attempts++;

                if ($attempts > 100) {
                    throw new \Exception('Failed to generate a unique faculties_Index after 100 attempts.');
                }
            } while (self::where('faculties_Index', $faculty->faculties_Index)->exists());
        });
    }
}

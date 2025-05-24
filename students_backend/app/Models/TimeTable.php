<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeTable extends Model
{
    use HasFactory;
    protected $primaryKey = 'timetable_id';
    protected $fillable = [
        'timetable_Index',
        'year',
        'accedamic_year',
        'semester',
        'faculties_id',
        'department_id',
        'monday',
        'tuday',
        'wenday',
        'theday',
        'friday',
    ];
    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getTimeTable = self::orderBy('timetable_id', 'desc')->first();
            if ($getTimeTable) {
                $latestID = intval(substr($getTimeTable->timetable_Index, 4));
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->timetable_Index = 'TIME' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            while (self::where('timetable_Index', $model->timetable_Index)->exists()) {
                $nextID++;
                $model->timetable_Index = 'TIME' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}

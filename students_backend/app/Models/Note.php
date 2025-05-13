<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $primaryKey = 'note_id';

    protected $fillable = [
        'note_Index',
        'subject_id',
        'document',
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $getNote = self::orderBy('note_id', 'desc')->first(); // Fixed variable name to $getNote
            if ($getNote) {
                $latestID = intval(substr($getNote->note_Index, 4)); // Extract numeric part from note_Index
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->note_Index = 'NOTE' . str_pad($nextID, 4, '0', STR_PAD_LEFT); // Generate note_Index
            while (self::where('note_Index', $model->note_Index)->exists()) { // Check for duplicate note_Index
                $nextID++;
                $model->note_Index = 'NOTE' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
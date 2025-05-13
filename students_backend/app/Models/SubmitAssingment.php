<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubmitAssingment extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
       'assingment_id',
        'subject_id',
        'student_id',
        'document' ,
        'description',
    ];
}

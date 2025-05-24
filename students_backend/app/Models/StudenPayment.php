<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudenPayment extends Model
{

    use HasFactory;
    protected $primaryKey = 'payment_id';

    protected $fillable = [
        'student_id',
        'payment_reason',
        'description',
    ];

}

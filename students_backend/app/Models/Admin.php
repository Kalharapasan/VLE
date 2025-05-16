<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $primaryKey = 'admin_id';

    protected $fillable = [
        'admin_Index',
        'admin_fname',
        'admin_lname',
        'admin_birthday',
        'admin_email',
        'admin_nic',
        'admin_gender',
        'admin_address',
        'admin_img',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $latestAdmin = self::orderBy('admin_id', 'desc')->first();
            $nextID = $latestAdmin ? intval(substr($latestAdmin->admin_Index, 3)) + 1 : 1;
            $model->admin_Index = 'ADM' . str_pad($nextID, 4, '0', STR_PAD_LEFT);

            while (self::where('admin_Index', $model->admin_Index)->exists()) {
                $nextID++;
                $model->admin_Index = 'ADM' . str_pad($nextID, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}

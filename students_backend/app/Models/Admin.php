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

        self::creating(function ($model) {
            $getAdmin = self::orderBy('admin_id', 'desc')->first(); 
            if ($getAdmin) {
                $latestID = intval(substr($getAdmin->admin_Index, 3)); 
                $nextID = $latestID + 1;
            } else {
                $nextID = 1;
            }

            $model->admin_Index = 'ADM' .sprintf("%04s",$nextID);
             while(self::where('admin_id',$model->admin_id)->exists()){
                $nextID++;
                $model->admin_Index = 'ADM' .sprintf("%04s",$nextID);

             }
        });
    }
}
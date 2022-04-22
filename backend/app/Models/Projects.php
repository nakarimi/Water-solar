<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;

       protected $fillable = [
       'country', 'city_id','name','discription','dirt_loss',
        'motor_cable','daynomic_head','daily_output','solar_brand_id','pump_brand_id','invertor_brand_id'
       ];

    public function geolocation()
    {
        return $this->belongsTo(Geolocation::class, 'city_id');
    }

}

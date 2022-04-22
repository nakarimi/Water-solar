<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pump_brands extends Model
{
    use HasFactory;
    protected $table = 'pump_brands';
    protected $primaryKey = 'id';
      protected $fillable = [
       'name', 'country','discription','image'
    ];

    public function pumplist()
    {
        return $this->hasMany(Pump_list::class, 'pump_brand_id');
    }

}

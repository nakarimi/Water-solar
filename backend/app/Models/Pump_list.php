<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pump_list extends Model
{
    use HasFactory;
    protected $table = 'pump_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'serial_no','pump_brand_id','model','outlet','ampeier','diameter','power','phase','hp','weight','voltage', 'discription', 'image','data_sheet','graph'
    ];

    public function pump_config()
    {
        return $this->hasMany(Config_pump::class, 'pump_list_id');
    }

    public function pump_brand()
    {
        return $this->belongsTo(Pump_brands::class, 'pump_brand_id');
    }

 
}

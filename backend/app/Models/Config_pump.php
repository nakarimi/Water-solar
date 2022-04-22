<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config_pump extends Model
{
    use HasFactory;
    protected $table = "config_pumps";
    protected $primaryKey = "id";
    protected $fillable = [
        'min_head', 'max_head', 'min_discharge', 'max_discharge', 'min_cable_length', 'max_cable_length', 'pump_list_id', 'cable_type_id'
    ];

       public function pump_list()
    {
        return $this->belongsTo(Pump_list::class, 'pump_list_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config_solar extends Model
{
    use HasFactory;
    protected $table = "config_solars";
    protected $primaryKey = "id";
    protected $fillable = [
        'power', 'base', 'solar_quantity', 'panal_quantity', 'image', 'solar_list_id'
    ];

    public function solar_list()
    {
        return $this->belongsTo(Solar_list::class, 'solar_list_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solar_list extends Model
{
    use HasFactory;
    protected $table = 'solar_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'serial_no','solar_brand_id','model','type','power','voltage','current', 'discription', 'image','data_sheet','cable_type_id'
    ];

   public function solar_config()
    {
        return $this->hasMany(Config_solar::class, 'solar_list_id');
    }

    public function solar_brand()
    {
        return $this->belongsTo(Solar_brands::class, 'solar_brand_id');
    }
}

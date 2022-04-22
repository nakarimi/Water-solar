<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvertorList extends Model
{
    use HasFactory;
    protected $table = 'invertor_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'invertor_brand_id', 'model', 'power', 'voltage', 'current', 'voltage_dc_min', 'voltage_dc_max', 'voltage_ac_min', 'voltage_ac_max', 'discription', 'image', 'data_sheet', 'diameter'
    ];

    public function invertor_brand()
    {
        return $this->belongsTo(InvertorBrand::class, 'invertor_brand_id');
    }
}

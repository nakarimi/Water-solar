<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config_Invertor extends Model
{
    use HasFactory;
    protected $table = "config_invertors";
    protected $primaryKey = "id";
    protected $fillable = [
        'power', 'invertor_list_id'
    ];

    public function invertor_list()
    {
        return $this->belongsTo(InvertorList::class, 'invertor_list_id');
    }
}

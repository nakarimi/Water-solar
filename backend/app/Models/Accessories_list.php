<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accessories_list extends Model
{
    use HasFactory;
    protected $table = 'accessories_lists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'accessories_type_id','name','model','uom_id', 'uom_name','min_quantity', 'max_quantity', 'discription','image', 'data_sheet'
    ];
}

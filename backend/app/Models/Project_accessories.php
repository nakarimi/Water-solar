<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project_accessories extends Model
{
    use HasFactory;
    

       protected $fillable = [
       'project_id', 'accessories_id','uom_id','quantity'
       ];
}

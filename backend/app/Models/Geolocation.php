<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Geolocation extends Model
{
    use HasFactory;
    protected $table = "geolocations";
    protected $primaryKey = "id";
    protected $fillable = [
        'country', 'city','latitude','longtitude'
     ];

    public function projects()
    {
        return $this->hasMany(Projects::class, 'city_id');
    }
    public function irradiations()
    {
        return $this->hasMany(Irradiation::class, 'geolocation_id');
    }
    public function users()
    {
        return $this->hasMany(User::class, 'geolocation_id');
    }
}

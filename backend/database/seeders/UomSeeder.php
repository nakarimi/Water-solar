<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
           $data = [
           
            [
                'name'=>'Meter',
                'acronym'=>'m',
            ],

            [
                'name'=>'Piece',
                'acronym'=>'pcs',
            ],
            [
                'name'=>'Carton',
                'acronym'=>'crtn',
            ],

            [
                'name'=>'Kilogram',
                'acronym'=>'kg',
            ],
          
          
            
        ];
        DB::table('uoms')->insert($data);
    }
}

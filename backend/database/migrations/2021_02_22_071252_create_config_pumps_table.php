<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigPumpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_pumps', function (Blueprint $table) {
            $table->id();
            $table->Integer('min_head')->nullable();
            $table->Integer('max_head')->nullable();
            $table->Integer('min_discharge')->nullable();
            $table->Integer('max_discharge')->nullable();
            $table->Integer('min_cable_length')->nullable();
            $table->Integer('max_cable_length')->nullable();
            $table->unsignedBigInteger('pump_list_id');
            $table->foreign('pump_list_id')->references('id')->on('pump_lists')->onDelete('cascade');
            $table->unsignedBigInteger('cable_type_id');
            $table->foreign('cable_type_id')->references('id')->on('cable_types')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('config_pumps');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('country');
            $table->unsignedBigInteger('city_id');
            $table->foreign('city_id')->references('id')->on('geolocations');
            $table->string('name');
            $table->string('discription')->nullable();
            $table->decimal('dirt_loss');
            $table->decimal('motor_cable');
            $table->decimal('daynomic_head');
            $table->decimal('daily_output');
            $table->unsignedBigInteger('solar_brand_id');
            $table->foreign('solar_brand_id')->references('id')->on('solar_brands');
            $table->unsignedBigInteger('pump_brand_id');
            $table->foreign('pump_brand_id')->references('id')->on('pump_brands');
            $table->unsignedBigInteger('invertor_brand_id');
            $table->foreign('invertor_brand_id')->references('id')->on('invertor_brands');
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
        Schema::dropIfExists('projects');
    }
}

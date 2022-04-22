<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolarListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solar_lists', function (Blueprint $table) {
            $table->id();
            $table->integer('serial_no');
            $table->unsignedBigInteger('solar_brand_id');
            $table->foreign('solar_brand_id')->references('id')->on('solar_brands')->onDelete('cascade');
            $table->string('model');
            $table->enum('type', ['Mono', 'Poly'])->default('Mono');
            $table->string('power');
            $table->string('voltage');
            $table->string('current');
            $table->unsignedBigInteger('cable_type_id');
            $table->foreign('cable_type_id')->references('id')->on('cable_types')->onDelete('cascade');
            $table->string('discription');
            $table->string('image')->nullable();
            $table->string('data_sheet')->nullable();
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
        Schema::dropIfExists('solar_lists');
    }
}

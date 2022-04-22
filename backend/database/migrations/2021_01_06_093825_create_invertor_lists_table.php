<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvertorListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invertor_lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invertor_brand_id');
            $table->foreign('invertor_brand_id')->references('id')->on('invertor_brands')->onDelete('cascade');
            $table->string('model');
            $table->string('power');
            $table->string('voltage');
            $table->string('current')->nullable();
            $table->string('voltage_dc_min');
            $table->string('voltage_dc_max');
            $table->string('voltage_ac_min')->nullable();
            $table->string('voltage_ac_max')->nullable();
            $table->string('discription')->nullable();
            $table->string('image')->nullable();
            $table->string('data_sheet')->nullable();
            $table->string('diameter')->nullable();
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
        Schema::dropIfExists('invertor_lists');
    }
}

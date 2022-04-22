<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePumpListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pump_lists', function (Blueprint $table) {
            $table->id();
            $table->integer('serial_no');
            $table->unsignedBigInteger('pump_brand_id');
            $table->foreign('pump_brand_id')->references('id')->on('pump_brands')->onDelete('cascade');
            $table->string('model');
            $table->string('outlet');
            $table->string('ampeier');
            $table->string('diameter');
            $table->string('power');
            $table->string('hp')->nullable();
            $table->string('weight')->nullable();
            $table->string('voltage')->nullable();
            $table->enum('phase', ['1Phase', '3Phase'])->default('1Phase');
            $table->string('discription')->nullable();
            $table->string('image')->nullable();
            $table->string('data_sheet')->nullable();
            $table->string('graph')->nullable();
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
        Schema::dropIfExists('pump_lists');
    }
}

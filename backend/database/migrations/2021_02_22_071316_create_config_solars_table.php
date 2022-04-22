<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigSolarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_solars', function (Blueprint $table) {
            $table->id();
            $table->string('power')->nullable();
            $table->enum('base', ['Manual Tracker', 'Ground Structure'])->nullable();
            $table->Integer('solar_quantity')->nullable();
            $table->Integer('panal_quantity')->nullable();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('solar_list_id')->nullable();
            $table->foreign('solar_list_id')->references('id')->on('solar_lists')->onDelete('cascade');
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
        Schema::dropIfExists('config_solars');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigInvertorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_invertors', function (Blueprint $table) {
            $table->id();
            $table->string('power')->nullable();
            $table->unsignedBigInteger('invertor_list_id')->nullable();
            $table->foreign('invertor_list_id')->references('id')->on('invertor_lists')->onDelete('cascade');
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
        Schema::dropIfExists('config_invertors');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIrradiationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('irradiations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('geolocation_id');
            $table->foreign('geolocation_id')->references('id')->on('geolocations')->onDelete('cascade');
            $table->unsignedBigInteger('month_id');
            $table->foreign('month_id')->references('id')->on('months')->onDelete('cascade');
            $table->string('t6am')->nullable();
            $table->string('t7am')->nullable();
            $table->string('t8am')->nullable();
            $table->string('t9am')->nullable();
            $table->string('t10am')->nullable();
            $table->string('t11am')->nullable();
            $table->string('t12am')->nullable();
            $table->string('t1pm')->nullable(); 
            $table->string('t2pm')->nullable();
            $table->string('t3pm')->nullable();
            $table->string('t4pm')->nullable();
            $table->string('t5pm')->nullable();
            $table->string('t6pm')->nullable();
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
        Schema::dropIfExists('irradiations');
    }
}

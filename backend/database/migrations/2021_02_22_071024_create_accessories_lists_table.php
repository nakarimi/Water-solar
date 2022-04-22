<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessoriesListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accessories_lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('accessories_type_id');
            $table->foreign('accessories_type_id')->references('id')->on('accessories_types')->onDelete('cascade');
            $table->string('name');
            $table->string('model');
            $table->unsignedBigInteger('uom_id');
            $table->string('uom_name');
            $table->foreign('uom_id')->references('id')->on('uoms')->onDelete('cascade');
            $table->string('uom_name');
            $table->Integer('min_quantity');
            $table->Integer('max_quantity');
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
        Schema::dropIfExists('accessories_lists');
    }
}

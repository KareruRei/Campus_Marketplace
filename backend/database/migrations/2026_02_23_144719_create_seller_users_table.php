<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seller_users', function (Blueprint $table) {
            $table->bigIncrements('SELLER_ID');

            $table->unsignedBigInteger('SELLER_USER_ID');
            $table->foreign('SELLER_USER_ID')
              ->references('USER_ID')
              ->on('users')
              ->onDelete('cascade');

            $table->decimal('SELLER_RATING', 3, 2)->default(0);
            $table->integer('SELLER_TOTALSALES')->default(0);
            $table->string('SELLER_PMLOC', 100)->nullable();
            $table->integer('SELLER_TOTALREVIEWS')->default(0);
            $table->dateTime('SELLER_LASTACTIVE')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_users');
    }
};

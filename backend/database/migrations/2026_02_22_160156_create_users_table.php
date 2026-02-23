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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('USER_ID');

            $table->string('USER_STUD_ID', 11);
            $table->foreign('USER_STUD_ID')
              ->references('STUD_ID')
              ->on('student_registries')
              ->onDelete('cascade');

            $table->string('USER_UNAME', 100)->unique();
            $table->string('USER_EMAIL', 150)->unique();
            $table->string('USER_PASS', 255);
            $table->string('USER_PHONE', 20);

            $table->dateTime('USER_CREATED_AT');

            $table->enum('USER_ROLE', ['user', 'admin']);
            $table->boolean('USER_IS_BANNED')->default(false);
            $table->text('USER_BAN_REASON')->nullable();
            $table->dateTime('USER_BAN_UNTIL')->nullable();

            $table->enum('USER_STATUS', ['Online', 'Offline', 'Banned']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

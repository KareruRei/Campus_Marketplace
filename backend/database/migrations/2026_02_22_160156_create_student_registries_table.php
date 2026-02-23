<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_registries', function (Blueprint $table) {
            $table->string('STUD_ID', 11)->primary();
            $table->string('STUD_FNAME', 100);
            $table->string('STUD_LNAME', 100);
            $table->string('STUD_CNUM', 15);
            $table->string('STUD_PROG', 7);
            $table->string('STUD_EMAIL', 100)->unique();
        });

        DB::statement("
            ALTER TABLE student_registries
            ADD CONSTRAINT chk_student_email
            CHECK (STUD_EMAIL LIKE '%@student.apc.edu.ph')
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('student_registries');
    }
};

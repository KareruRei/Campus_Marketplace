<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentRegistrySeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            // Add many student IDs so testing is easier
            ['student_id' => '2024-104135', 'full_name' => 'Test Student', 'email' => 'asdaod@student.apc.edu.ph'],
            ['student_id' => '2024-100001', 'full_name' => 'Juan Dela Cruz', 'email' => 'jdc@student.apc.edu.ph'],
            ['student_id' => '2024-100002', 'full_name' => 'Jane Smith', 'email' => 'jsmith@student.apc.edu.ph'],
            ['student_id' => '2024-100003', 'full_name' => 'John Doe', 'email' => 'jdoe@student.apc.edu.ph'],
            ['student_id' => '2025-100001', 'full_name' => 'JD Gonzales', 'email' => 'jdgonzales3@student.apc.edu.ph'],
            ['student_id' => '2025-100002', 'full_name' => 'JD Gonzales Alt', 'email' => 'jdgonzales2@student.apc.edu.ph'],
            ['student_id' => '2025-100003', 'full_name' => 'Test User Three', 'email' => 'test3@student.apc.edu.ph'],
            ['student_id' => '2025-100004', 'full_name' => 'Test User Four', 'email' => 'test4@student.apc.edu.ph'],
            ['student_id' => '2025-100005', 'full_name' => 'Test User Five', 'email' => 'test5@student.apc.edu.ph'],
            ['student_id' => '2026-100001', 'full_name' => 'New Student 2026', 'email' => 'new2026@student.apc.edu.ph'],
        ];

        foreach ($students as $student) {
            DB::table('student_registry')->updateOrInsert(
                ['student_id' => $student['student_id']],
                array_merge($student, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}

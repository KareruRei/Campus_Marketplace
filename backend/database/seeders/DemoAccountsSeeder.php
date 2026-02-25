<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DemoAccountsSeeder extends Seeder
{
    public function run(): void
    {
        // ── 1. Register student IDs in student_registry first (FK requirement) ──
        $registryEntries = [
            ['student_id' => '2025-200001', 'full_name' => 'Marco Villanueva',  'email' => 'mvillanueva@student.apc.edu.ph'],
            ['student_id' => '2025-200002', 'full_name' => 'Sofia Reyes',       'email' => 'sreyes@student.apc.edu.ph'],
            ['student_id' => '2025-200003', 'full_name' => 'Admin Castillo',    'email' => 'acastillo@student.apc.edu.ph'],
        ];

        foreach ($registryEntries as $entry) {
            DB::table('student_registry')->updateOrInsert(
                ['student_id' => $entry['student_id']],
                array_merge($entry, ['created_at' => now(), 'updated_at' => now()])
            );
        }

        // ── 2. Create demo user accounts ────────────────────────────────────────

        // SELLER – Marco Villanueva
        DB::table('users')->updateOrInsert(
            ['email' => 'mvillanueva@student.apc.edu.ph'],
            [
                'student_id'  => '2025-200001',
                'name'        => 'Marco Villanueva',
                'password'    => Hash::make('password123'),
                'phone'       => '09171234567',
                'role'        => 'user',
                'is_banned'   => false,
                'rating'      => 4.80,
                'sales_count' => 12,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]
        );

        // BUYER – Sofia Reyes
        DB::table('users')->updateOrInsert(
            ['email' => 'sreyes@student.apc.edu.ph'],
            [
                'student_id'  => '2025-200002',
                'name'        => 'Sofia Reyes',
                'password'    => Hash::make('password123'),
                'phone'       => '09281234567',
                'role'        => 'user',
                'is_banned'   => false,
                'rating'      => 0,
                'sales_count' => 0,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]
        );

        // ADMIN – Admin Castillo
        DB::table('users')->updateOrInsert(
            ['email' => 'acastillo@student.apc.edu.ph'],
            [
                'student_id'  => '2025-200003',
                'name'        => 'Admin Castillo',
                'password'    => Hash::make('admin12345'),
                'phone'       => '09391234567',
                'role'        => 'admin',
                'is_banned'   => false,
                'rating'      => 0,
                'sales_count' => 0,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]
        );
    }
}

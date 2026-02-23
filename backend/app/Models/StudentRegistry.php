<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentRegistry extends Model
{
    use HasFactory;

    protected $table = 'student_registry';

    protected $fillable = [
        'student_id',
        'full_name',
        'email',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'student_id', 'student_id');
    }
}

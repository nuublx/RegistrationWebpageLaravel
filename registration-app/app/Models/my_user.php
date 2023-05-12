<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class my_user extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'user_name', 'full_name', 'birth_date', 'phone', 'address', 'user_image', 'email', 'password'];
}
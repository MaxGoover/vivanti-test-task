<?php

namespace App\Models\News;

use Database\Factories\News\NewsFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
    ];

    public function comments()
    {
        return $this->hasMany(NewsComment::class);
    }

    protected static function newFactory(): Factory
    {
        return NewsFactory::new();
    }
}

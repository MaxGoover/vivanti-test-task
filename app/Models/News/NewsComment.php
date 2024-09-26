<?php

namespace App\Models\News;

use Database\Factories\News\NewsCommentFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
    ];

    public function news()
    {
        return $this->belongsTo(News::class);
    }

    protected static function newFactory(): Factory
    {
        return NewsCommentFactory::new();
    }
}

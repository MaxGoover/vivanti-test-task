<?php

namespace App\Models\News;

use Database\Factories\News\NewsCommentFactory;
use Carbon\Carbon;
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

    public function getCreatedAtFormattedAttribute($value)
    {
        return Carbon::parse($value)->translatedFormat('H:i d F Y');
    }
}

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

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    protected static function newFactory(): Factory
    {
        return NewsCommentFactory::new();
    }

    public function getFormattedCreatedAtAttribute()
    {
        return Carbon::parse($this->created_at)->translatedFormat('H:i d F Y');
    }

    public static function buildTreeChildren($comments)
    {
        $commentsTree = [];

        foreach ($comments as $comment) {
            $commentsTree[] = [
                'children'   => self::buildTreeChildren($comment->children),
                'content'    => $comment->content,
                'created_at' => $comment->formattedCreatedAt,
                'id'         => $comment->id,
                'parent_id'  => $comment->parent_id,
            ];
        }

        return $commentsTree;
    }
}

<?php

namespace App\Models\News;

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
}

<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use App\Models\News\News;

class NewsController extends Controller
{
    public function index()
    {
        return inertia('news/PageNewsIndex', [
            'message' => __('message.success.news.index'),
            'news' => News::latest()
                ->paginate(config('settings.news.pagination.rowsPerPage.index'))
                ->through(fn($news) => [
                    'content' => $news->previewContent,
                    'countViews' => $news->count_views,
                    'id' => $news->id,
                    'title' => $news->title,
                ]),
        ]);
    }

    public function show(News $news)
    {
        return inertia('news/PageNewsShow', [
            'countComments' => $news->countComments,
            'message' => __('message.success.news.show'),
            'news' => [
                'content' => $news->content,
                'countViews' => $news->count_views,
                'created_at' => $news->created_at->format('d.m.Y'),
                'id' => $news->id,
                'title' => $news->title,
            ],
        ]);
    }
}

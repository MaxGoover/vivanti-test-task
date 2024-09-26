<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use App\Models\News\News;
use App\Models\News\NewsComment;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return inertia('news/PageNewsIndex', [
            'news' => News::latest()
                ->paginate(config('settings.news.pagination.rowsPerPage'))
                ->through(fn($article) => [
                    'title' => $article->title,
                    'content' => $article->content,
                    'countViews' => $article->count_views,
                ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function show(News $news)
    {
        return inertia('news/PageNewsShow', [
            'article' => [
                'title' => $news->title,
                'content' => $news->content,
                'countViews' => $news->count_views,
            ],
            'comments' => NewsComment::where('news_id', $news->id)->latest()
                ->paginate(config('settings.news.comments.pagination.rowsPerPage'))
                ->through(fn($comment) => [
                    'content' => $comment->content,
                    'created_at' => $comment->created_at->toDateTimeString(),
                    'id' => $comment->id,
                    'parent_id' => $comment->parent_id,
                    'title' => $comment->title,
                ]),
            'countComments' => NewsComment::where('news_id', $news->id)->count(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

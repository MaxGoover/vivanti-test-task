<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use App\Models\News\News;
use App\Models\News\NewsComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class NewsController extends Controller
{
    public function index()
    {
        return inertia('news/PageNewsIndex', [
            'news' => News::latest()
                ->paginate(config('settings.news.pagination.rowsPerPage'))
                ->through(fn($news) => [
                    'content' => $news->content,
                    'countViews' => $news->count_views,
                    'id' => $news->id,
                    'title' => $news->title,
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
            'news' => [
                'content' => $news->content,
                'countComments' => NewsComment::where('news_id', $news->id)->count(),
                'countViews' => $news->count_views,
                'created_at' => $news->created_at->format('d.m.Y'),
                'id' => $news->id,
                'title' => $news->title,
            ],
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

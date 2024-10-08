<?php

declare(strict_types=1);

namespace App\Actions\News;

use App\Models\News\News;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class NewsIndexAction
{
    public function __invoke(): JsonResponse
    {
        try {
            return response()->json([
                'message' => __('message.success.news.index'),
                'news' => News::latest()
                    ->paginate(config('settings.news.pagination.rowsPerPage.show'))
                    ->through(fn($news) => [
                        'content' => $news->previewContent,
                        'countViews' => $news->count_views,
                        'id' => $news->id,
                        'title' => $news->title,
                    ]),
            ], 200);
        } catch (Throwable $error) {
            return response()->json([
                'message' => __('message.error.news.index'),
            ], 400);
        }
    }
}

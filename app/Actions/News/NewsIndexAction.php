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
                'news' => News::latest()
                    ->paginate(4)
                    ->through(fn($news) => [
                        'content' => $news->content,
                        'countViews' => $news->count_views,
                        'id' => $news->id,
                        'title' => $news->title,
                    ]),
                'message' => 'Статьи получены успешно',
            ], 200);
        } catch (Throwable $error) {
            return response()->json([
                // 'message' => 'Не удалось получить статьи',
                'message' => $error->getMessage(),
            ], 400);
        }
    }
}

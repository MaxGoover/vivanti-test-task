<?php

declare(strict_types=1);

namespace App\Actions\News;

use App\Models\News\NewsComment;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class NewsCommentDeleteAction
{
    public function __invoke(NewsComment $newsComment): JsonResponse
    {
        try {
            $newsComment->delete();

            return response()->json([
                'message' => 'Комментарий удалён успешно',
            ], 200);
        } catch (Throwable $error) {
            return response()->json([
                // 'message' => 'Не удалось удалить комментарий',
                'message' => $error->getMessage(),
            ], 400);
        }
    }
}

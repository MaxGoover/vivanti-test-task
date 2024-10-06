<?php

declare(strict_types=1);

namespace App\Actions\News;

use App\Http\Requests\News\NewsCommentUpdateRequest;
use App\Models\News\NewsComment;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class NewsCommentUpdateAction
{
    public function __invoke(NewsCommentUpdateRequest $request, NewsComment $newsComment): JsonResponse
    {
        try {
            $newsCommentData = $request->validated();
            $newsComment->update($newsCommentData);

            return response()->json([
                'message' => 'Комментарий отредактирован успешно',
            ], 200);
        } catch (Throwable $error) {
            return response()->json([
                // 'message' => 'Не удалось отредактировать комментарий',
                'message' => $error->getMessage(),
            ], 400);
        }
    }
}

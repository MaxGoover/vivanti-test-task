<?php

declare(strict_types=1);

namespace App\Actions\News;

use App\Http\Requests\News\NewsCommentCreateRequest;
use App\Models\News\NewsComment;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class NewsCommentCreateAction
{
    public function __invoke(NewsCommentCreateRequest $request): JsonResponse
    {
        try {
            $newsCommentData = $request->validated();
            NewsComment::create($newsCommentData);

            return response()->json([
                'message' => 'Комментарий сохранен успешно',
            ], 200);
        } catch (Throwable $error) {
            return response()->json([
                // 'message' => 'Не удалось сохранить комментарий',
                'message' => $error->getMessage(),
            ], 400);
        }
    }
}

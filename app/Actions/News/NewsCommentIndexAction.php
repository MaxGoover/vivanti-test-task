<?php

declare(strict_types=1);

namespace App\Actions\News;

use App\Models\News\NewsComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

final readonly class NewsCommentIndexAction
{
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $newsId = $request->route('id');

            return response()->json([
                'comments' => NewsComment::with('children')
                    ->where('news_id', $newsId)
                    ->whereNull('parent_id')
                    ->latest()
                    ->paginate(config('settings.news.comments.pagination.rowsPerPage'))
                    ->through(fn($comment) => [
                        'children' => NewsComment::buildTreeChildren($comment->children()->orderBy('created_at', 'desc')->get()),
                        'content' => $comment->content,
                        'created_at' => $comment->formattedCreatedAt,
                        'id' => $comment->id,
                        'parent_id' => $comment->parent_id,
                        'title' => $comment->title,
                    ]),
                'countComments' => NewsComment::where('news_id', $newsId)->count(),
                'message' => 'Комментарии к статье получены успешно',
            ], 200);
        } catch (Throwable $error) {
            return response()->json([
                // 'message' => 'Не удалось получить комментарии к статье',
                'message' => $error->getMessage(),
            ], 400);
        }
    }
}

<?php

declare(strict_types=1);

namespace App\Actions\News;

use App\Models\News\News;
use App\Models\News\NewsComment;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class NewsCommentIndexAction
{
    public function __invoke(News $news): JsonResponse
    {
        try {
            return response()->json([
                'comments' => $news->comments()
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
                'countComments' => $news->countComments,
                'message' => __('message.success.newsComments.index'),
            ], 200);
        } catch (Throwable $error) {
            return response()->json([
                'message' => __('message.error.newsComments.index'),
            ], 400);
        }
    }
}

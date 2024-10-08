<?php

use App\Actions\News\NewsCommentCreateAction;
use App\Actions\News\NewsCommentDeleteAction;
use App\Actions\News\NewsCommentIndexAction;
use App\Actions\News\NewsCommentUpdateAction;
use App\Actions\News\NewsIndexAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// News
Route::get('/news', NewsIndexAction::class);

// NewsComment
Route::get('/news/{news}/comments', NewsCommentIndexAction::class);
Route::post('/news/{id}/comments', NewsCommentCreateAction::class);
Route::put('/news/comments/{news_comment}', NewsCommentUpdateAction::class);
Route::delete('/news/comments/{news_comment}', NewsCommentDeleteAction::class);

<?php

use App\Actions\News\NewsCommentCreateAction;
use App\Actions\News\NewsCommentIndexAction;
use App\Actions\News\NewsIndexAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// News
Route::get('/news', NewsIndexAction::class);

// NewsComment
Route::get('/news/{id}/comments', NewsCommentIndexAction::class);
Route::post('/news/{id}/comments', NewsCommentCreateAction::class);

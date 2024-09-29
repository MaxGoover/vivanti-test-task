<?php

use App\Actions\News\NewsCommentIndexAction;
use App\Actions\News\NewsIndexAction;
use App\Http\Controllers\News\NewsCommentController;
use App\Http\Controllers\News\NewsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::resource('/news', NewsController::class);

Route::post('/news/comments', [NewsCommentController::class, 'create']);

// queries
Route::get('/api/news', NewsIndexAction::class);

Route::get('/api/news/{id}/comments', NewsCommentIndexAction::class);

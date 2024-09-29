<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use App\Http\Requests\News\NewsCommentCreateRequest;
use App\Models\News\NewsComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class NewsCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function create(NewsCommentCreateRequest $request): JsonResponse
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace Database\Factories\News;

use App\Models\News\News;
use App\Models\News\NewsComment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News\NewsComment>
 */
class NewsCommentFactory extends Factory
{
    public function definition(): array
    {
        $hasParentNewsComment = false;
        $contentLength = rand(10, 1000);

        /** @var News $news */
        $news = News::inRandomOrder()->first();

        /** @var NewsComment $newsComment */
        $newsComment = NewsComment::inRandomOrder()->first();
        if ($newsComment) {
            $hasParentNewsComment = (bool)rand(0, 1);
        }

        return [
            'news_id' => $news->id,
            'parent_id' => $hasParentNewsComment ? $newsComment->id : null,
            'content' => fake()->realText($contentLength),
        ];
    }
}

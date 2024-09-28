<?php

namespace Database\Factories\News;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News\News>
 */
class NewsFactory extends Factory
{
    public function definition(): array
    {
        $titleLength = rand(10, 100);
        $contentLength = rand(10, 10000);

        return [
            'title' => fake()->realText($titleLength),
            'content' => fake()->realText($contentLength),
            'count_views' => rand(0, 1000),
        ];
    }
}

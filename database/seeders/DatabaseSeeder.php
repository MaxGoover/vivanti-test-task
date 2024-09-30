<?php

namespace Database\Seeders;

use App\Models\News\News;
use App\Models\News\NewsComment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        News::factory(10)->create();
        NewsComment::factory(10)->create();
        NewsComment::factory(30)->create();
    }
}

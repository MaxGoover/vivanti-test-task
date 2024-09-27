<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news_comments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('news_id');
            $table->bigInteger('parent_id')->nullable();
            $table->text('content')->nullable(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('news_id')
                ->references('id')
                ->on('news')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('parent_id')
                ->references('id')
                ->on('news_comments')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_comments');
    }
};

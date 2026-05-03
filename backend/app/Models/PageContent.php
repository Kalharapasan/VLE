<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PageContent extends Model
{
    protected $fillable = [
        'page_slug', 'section_key', 'content', 'image_path', 'title', 'sort_order'
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public function scopeForPage($query, $slug)
    {
        return $query->where('page_slug', $slug)->orderBy('sort_order');
    }

    public function scopeForSection($query, $slug, $key)
    {
        return $query->where('page_slug', $slug)->where('section_key', $key)->first();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PageContentController extends Controller
{
    // GET /api/page-content - Get all page content (optionally filter by page_slug)
    public function index(Request $request)
    {
        $query = PageContent::query();
        if ($request->has('page_slug')) {
            $query->where('page_slug', $request->page_slug);
        }
        return response()->json($query->orderBy('sort_order')->get());
    }

    // POST /api/page-content - Create new page section
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'page_slug' => 'required|string|in:home,about,contact,academic',
            'section_key' => 'required|string|max:100',
            'content' => 'nullable|string',
            'image_path' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'sort_order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $content = PageContent::create($validator->validated());
        return response()->json(['message' => 'Content created', 'data' => $content]);
    }

    // GET /api/page-content/{id} - Show single content
    public function show($id)
    {
        $content = PageContent::findOrFail($id);
        return response()->json($content);
    }

    // PUT /api/page-content/update/{id} - Update content
    public function update(Request $request, $id)
    {
        $content = PageContent::findOrFail($id);
        $content->update($request->all());
        return response()->json(['message' => 'Content updated', 'data' => $content]);
    }

    // DELETE /api/page-content/{id} - Delete content
    public function destroy($id)
    {
        $content = PageContent::findOrFail($id);
        $content->delete();
        return response()->json(['message' => 'Content deleted']);
    }

    // GET /api/page-content/by-page/{page_slug} - Get all content for a page
    public function byPage($slug)
    {
        $contents = PageContent::where('page_slug', $slug)->orderBy('sort_order')->get();
        return response()->json($contents);
    }

    // POST /api/page-content/update-section - Update or create a section
    public function updateSection(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'page_slug' => 'required|string',
            'section_key' => 'required|string',
            'content' => 'nullable|string',
            'image_path' => 'nullable|string',
            'title' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $section = PageContent::where('page_slug', $request->page_slug)
            ->where('section_key', $request->section_key)
            ->first();

        if ($section) {
            $section->update($request->only(['content', 'image_path', 'title', 'sort_order']));
        } else {
            $section = PageContent::create($request->all());
        }

        return response()->json(['message' => 'Section updated', 'data' => $section]);
    }
}

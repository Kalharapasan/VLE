import api, { API_URL } from './api';

// Get all page content (optionally filter by page_slug)
export const getPageContents = (slug = null) => {
    const url = slug ? `/page-content/by-page/${slug}` : '/page-content';
    return api.get(url);
};

// Update or create a page section
export const updatePageSection = (pageSlug, sectionKey, data) => {
    return api.post('/page-content/update-section', {
        page_slug: pageSlug,
        section_key: sectionKey,
        ...data,
    });
};

// Delete a page section
export const deletePageSection = (id) => api.delete(`/page-content/${id}`);

// Helper to get section content from page data
export const getSection = (contents, sectionKey) => {
    if (!Array.isArray(contents)) return null;
    const section = contents.find(c => c.section_key === sectionKey);
    return section ? section.content : null;
};

// Helper to get section image from page data
export const getSectionImage = (contents, sectionKey) => {
    if (!Array.isArray(contents)) return null;
    const section = contents.find(c => c.section_key === sectionKey);
    return section ? section.image_path : null;
};

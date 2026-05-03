<?php

/**
 * Script to seed page content data
 * Run: php seed_pages.php
 */

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\PageContent;

// Helper function
function addSection($pageSlug, $sectionKey, $title, $content, $imagePath = null, $sortOrder = 0) {
    PageContent::updateOrCreate(
        ['page_slug' => $pageSlug, 'section_key' => $sectionKey],
        ['title' => $title, 'content' => $content, 'image_path' => $imagePath, 'sort_order' => $sortOrder]
    );
}

// Home Page
addSection('home', 'hero_title', 'Hero Title', 'Welcome to VLE');
addSection('home', 'hero_subtitle', 'Hero Subtitle', 'Virtual Learning Environment');
addSection('home', 'about_title', 'About Title', 'About Our University');
addSection('home', 'about_description', 'About Description', 'We are committed to providing quality education through innovative teaching methods and modern technology.');

// About Page
addSection('about', 'header_title', 'Header Title', 'About South Eastern University');
addSection('about', 'vision_title', 'Vision Title', 'Our Vision');
addSection('about', 'vision', 'Vision', 'To be a centre of excellence in teaching, learning and research with a commitment to serve the society.');
addSection('about', 'mission_title', 'Mission Title', 'Our Mission');
addSection('about', 'mission', 'Mission', 'To pursue education, research, and scholarship and enhance community engagement to meet national and global needs.');
addSection('about', 'history_title', 'History Title', 'History');
addSection('about', 'history', 'History', 'The South Eastern University of Sri Lanka (SEUSL) was established in 1995.');
addSection('about', 'contact_title', 'Contact Title', 'Contact Information');
addSection('about', 'address', 'Address', 'South Eastern University of Sri Lanka, University Park, Oluvil');
addSection('about', 'phone', 'Phone', '+94 67 2255062');
addSection('about', 'email', 'Email', 'info@seu.ac.lk');

// Contact Page
addSection('contact', 'header_title', 'Header Title', 'Contact Us');
addSection('contact', 'header_subtitle', 'Header Subtitle', 'Get in touch with us');
addSection('contact', 'info_title', 'Info Title', 'Contact Information');
addSection('contact', 'address', 'Address', 'South Eastern University of Sri Lanka, University Park, Oluvil');
addSection('contact', 'phone', 'Phone', '+94 67 2255062');
addSection('contact', 'email', 'Email', 'info@seu.ac.lk');
addSection('contact', 'hours', 'Hours', 'Mon-Fri: 8:00 AM - 4:30 PM');

// Academic Page
addSection('academic', 'hero_title', 'Hero Title', 'Academic Programs');
addSection('academic', 'hero_subtitle', 'Hero Subtitle', 'Explore our programs');
addSection('academic', 'ug_title', 'UG Title', 'Undergraduate Programs');
addSection('academic', 'pg_title', 'PG Title', 'Postgraduate Programs');
addSection('academic', 'faculties_title', 'Faculties Title', 'Our Faculties');
addSection('academic', 'faculties_desc', 'Faculties Desc', 'We have multiple faculties offering diverse programs.');
addSection('academic', 'dept_title', 'Dept Title', 'Departments');

echo "Page content seeded successfully!\n";

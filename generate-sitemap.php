<?php
// Base URL website
$baseUrl = 'https://job-listings-dnq.pages.dev';

// Daftar file JSON
$jsonFiles = glob('*.json');

// Mulai membuat sitemap
$sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

foreach ($jsonFiles as $file) {
    // Ambil nama file tanpa ekstensi
    $jobId = basename($file, '.json');

    // Tambahkan URL ke sitemap
    $sitemapContent .= '
    <url>
        <loc>' . $baseUrl . '/job/' . $jobId . '</loc>
        <lastmod>' . date('Y-m-d') . '</lastmod>
        <changefreq>dayly</changefreq>
        <priority>0.8</priority>
    </url>';
}

// Tutup sitemap
$sitemapContent .= '
</urlset>';

// Simpan sitemap ke file
file_put_contents('sitemap.xml', $sitemapContent);

echo 'Sitemap generated successfully!';
?>

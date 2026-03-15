$base = "c:\xampp\htdocs\UPWORK\SRC LMS\src_labFinal"
$files = @(
    "admin\branding.html",
    "admin\users.html",
    "admin\quizzes.html",
    "admin\academic-year.html",
    "faculty\dashboard.html",
    "student\dashboard.html",
    "student\announcements.html"
)

foreach ($f in $files) {
    $path = Join-Path $base $f
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    # Skip if sidebar.js already in head (before </head>)
    $headSection = [regex]::Match($content, '(?s)<head>.*?</head>').Value
    if ($headSection -match 'sidebar\.js') {
        Write-Host "SKIP (already in head): $f"
        continue
    }
    
    # Insert sidebar.js right before </head>
    $sinsertion = '    <script src="../js/sidebar.js"></script>'
    $content = $content -replace '</head>', "$sinsertion`n</head>"
    
    # Remove from bottom of body if present
    $content = $content -replace '(?m)[ \t]*<script src="\.\./js/sidebar\.js"></script>[ \t]*\r?\n', ''
    
    # Remove simple lucide DOMContentLoaded block if exists
    $content = $content -replace '(?s)\r?\n\s*<script>\s*\r?\n\s*document\.addEventListener\(''DOMContentLoaded'',\s*\(\)\s*=>\s*\{\s*\r?\n\s*if\s*\(window\.lucide\)\s*lucide\.createIcons\(\);\s*\r?\n\s*\}\);\s*\r?\n\s*</script>', ''
    
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "DONE: $f"
}

Write-Host "Finished."

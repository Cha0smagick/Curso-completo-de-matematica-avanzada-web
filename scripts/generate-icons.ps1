# scripts/generate-icons.ps1
# Genera los iconos PNG del manifest/favicon/OG desde cero (GDI+).
# Uso: powershell -File scripts/generate-icons.ps1
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot '..\public\assets\images'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function New-Icon {
  param([int]$Size, [string]$Path, [float]$GlyphRatio = 0.62, [string]$Text = $null)

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'

  # Fondo degradado cyan -> morado (brand)
  $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 34, 211, 238), [System.Drawing.Color]::FromArgb(255, 168, 85, 247), 45.0)
  $g.FillRectangle($brush, $rect)

  if ($Text) {
    # OG image u otros con texto
    $fontSize = [float]($Size * 0.09)
    $font = New-Object System.Drawing.Font('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Bold)
    $white = [System.Drawing.Brushes]::White
    $g.DrawString('Matematicas', $font, $white, [float]($Size * 0.07), [float]($Size * 0.30))
    $g.DrawString('Avanzadas', $font, $white, [float]($Size * 0.07), [float]($Size * 0.42))
    $small = New-Object System.Drawing.Font('Segoe UI', [float]($Size * 0.038), [System.Drawing.FontStyle]::Regular)
    $g.DrawString('Curso completo, gratuito e interactivo', $small, [System.Drawing.Brushes]::WhiteSmoke, [float]($Size * 0.07), [float]($Size * 0.60))
  }
  else {
    # Glifo sigma centrado (zona segura maskable: 62% del lienzo)
    $fontSize = [float]($Size * $GlyphRatio)
    $font = New-Object System.Drawing.Font('Cambria Math', $fontSize, [System.Drawing.FontStyle]::Bold)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = 'Center'
    $sf.LineAlignment = 'Center'
    $g.DrawString([string][char]0x03A3, $font, [System.Drawing.Brushes]::White, [System.Drawing.RectangleF]$rect, $sf)
  }

  $g.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "OK $Path"
}

# Iconos PWA (manifest: any + maskable)
New-Icon -Size 192 -Path (Join-Path $outDir 'icon-192.png')
New-Icon -Size 512 -Path (Join-Path $outDir 'icon-512.png')
# Favicons / apple
New-Icon -Size 32 -Path (Join-Path $outDir 'favicon-32.png') -GlyphRatio 0.8
New-Icon -Size 16 -Path (Join-Path $outDir 'favicon-16.png') -GlyphRatio 0.9
New-Icon -Size 180 -Path (Join-Path $outDir 'apple-touch-icon.png')
# Open Graph 1200x630
$og = New-Object System.Drawing.Bitmap(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($og)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'
$rect = New-Object System.Drawing.Rectangle(0, 0, 1200, 630)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 10, 15, 26), [System.Drawing.Color]::FromArgb(255, 30, 27, 75), 45.0)
$g.FillRectangle($brush, $rect)
$titleFont = New-Object System.Drawing.Font('Segoe UI', 74, [System.Drawing.FontStyle]::Bold)
$g.DrawString('Matematicas Avanzadas', $titleFont, [System.Drawing.Brushes]::White, 60, 210)
$subFont = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Regular)
$g.DrawString('De cero a nivel universitario - Curso interactivo gratuito', $subFont, [System.Drawing.Brushes]::LightCyan, 64, 330)
$g.Dispose()
$og.Save((Join-Path $outDir 'og-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$og.Dispose()
Write-Host 'OK og-image.png'

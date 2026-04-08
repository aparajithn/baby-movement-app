#!/usr/bin/env python3
"""
Generate app icons and splash screen for Baby Movement App
Color palette: coral (#E8A87C), sage (#85C1A5), cream (#FDF8F3)
"""

from PIL import Image, ImageDraw, ImageFont
import math

# Color palette
CORAL = "#E8A87C"
CORAL_DARK = "#D4956A"
SAGE = "#85C1A5"
SAGE_DARK = "#6FA890"
CREAM = "#FDF8F3"
WHITE = "#FFFFFF"
TEXT_DARK = "#3D3D3D"

def create_rounded_rectangle(draw, coords, radius, fill, outline=None):
    """Draw a rounded rectangle"""
    x0, y0, x1, y1 = coords
    draw.rounded_rectangle(coords, radius=radius, fill=fill, outline=outline)

def draw_baby_silhouette(draw, center_x, center_y, size, color):
    """Draw a simple, friendly baby silhouette"""
    # Head (circle)
    head_radius = size // 4
    head_center_y = center_y - size // 8
    draw.ellipse(
        [center_x - head_radius, head_center_y - head_radius,
         center_x + head_radius, head_center_y + head_radius],
        fill=color
    )
    
    # Body (simple curved shape)
    body_top = head_center_y + head_radius - size // 20
    body_bottom = center_y + size // 3
    body_width = size // 3
    
    # Draw body as rounded ellipse
    draw.ellipse(
        [center_x - body_width // 2, body_top,
         center_x + body_width // 2, body_bottom],
        fill=color
    )
    
    # Arms (curved lines suggesting movement)
    arm_length = size // 5
    arm_width = 8
    
    # Left arm up
    draw.line(
        [center_x - body_width // 4, body_top + size // 10,
         center_x - body_width // 2 - size // 10, body_top - size // 10],
        fill=color, width=arm_width
    )
    
    # Right arm up
    draw.line(
        [center_x + body_width // 4, body_top + size // 10,
         center_x + body_width // 2 + size // 10, body_top - size // 10],
        fill=color, width=arm_width
    )
    
    # Legs (suggesting bicycle motion)
    leg_width = 10
    
    # Left leg
    draw.line(
        [center_x - body_width // 6, body_bottom - size // 20,
         center_x - body_width // 2, body_bottom + size // 6],
        fill=color, width=leg_width
    )
    
    # Right leg
    draw.line(
        [center_x + body_width // 6, body_bottom - size // 20,
         center_x + body_width // 2, body_bottom + size // 6],
        fill=color, width=leg_width
    )

def draw_gentle_shape(draw, center_x, center_y, size, color):
    """Draw a playful, gentle abstract shape"""
    # Create a soft, cloud-like shape
    points = []
    num_points = 8
    for i in range(num_points):
        angle = (2 * math.pi * i) / num_points
        # Vary the radius for organic shape
        radius = size // 3 + (size // 8) * math.sin(3 * angle)
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle)
        points.append((x, y))
    
    draw.polygon(points, fill=color)

def create_app_icon(size=1024):
    """Create the main app icon"""
    img = Image.new('RGB', (size, size), CREAM)
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    
    # Background circle (sage)
    bg_radius = size // 2 - 40
    draw.ellipse(
        [center - bg_radius, center - bg_radius,
         center + bg_radius, center + bg_radius],
        fill=SAGE
    )
    
    # Inner decorative circle (coral, lighter)
    inner_radius = bg_radius - 60
    draw.ellipse(
        [center - inner_radius, center - inner_radius,
         center + inner_radius, center + inner_radius],
        fill=CORAL
    )
    
    # Baby silhouette in white
    silhouette_size = size // 2
    draw_baby_silhouette(draw, center, center, silhouette_size, WHITE)
    
    # Add subtle glow effect
    glow_radius = bg_radius + 20
    for i in range(5, 0, -1):
        alpha = int(30 * i / 5)
        glow_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        glow_draw = ImageDraw.Draw(glow_img)
        glow_draw.ellipse(
            [center - glow_radius - i*10, center - glow_radius - i*10,
             center + glow_radius + i*10, center + glow_radius + i*10],
            fill=(133, 193, 165, alpha)
        )
        img = Image.alpha_composite(img.convert('RGBA'), glow_img).convert('RGB')
        draw = ImageDraw.Draw(img)
    
    return img

def create_adaptive_icon(size=1024):
    """Create adaptive icon for Android (simpler, works with mask)"""
    img = Image.new('RGB', (size, size), CREAM)
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    
    # Full background (will be masked by system)
    draw.rectangle([0, 0, size, size], fill=SAGE)
    
    # Central design element
    icon_size = size // 2
    
    # Draw gentle shape background
    draw_gentle_shape(draw, center, center, icon_size + 100, CORAL)
    
    # Baby silhouette
    draw_baby_silhouette(draw, center, center, icon_size, WHITE)
    
    return img

def create_splash_screen(width=1284, height=2778):
    """Create splash screen"""
    img = Image.new('RGB', (width, height), CREAM)
    draw = ImageDraw.Draw(img)
    
    center_x = width // 2
    center_y = height // 2
    
    # Subtle gradient background (cream to slightly warmer)
    for y in range(height):
        ratio = y / height
        r = int(253 * (1 - ratio * 0.05))
        g = int(248 * (1 - ratio * 0.05))
        b = int(243 * (1 - ratio * 0.05))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Main logo area
    logo_size = min(width, height) // 3
    logo_y = center_y - logo_size // 2 - 100
    
    # Background circle
    bg_radius = logo_size // 2 + 40
    draw.ellipse(
        [center_x - bg_radius, logo_y - bg_radius + logo_size // 2,
         center_x + bg_radius, logo_y + bg_radius + logo_size // 2],
        fill=SAGE
    )
    
    # Inner circle
    inner_radius = logo_size // 2 - 20
    draw.ellipse(
        [center_x - inner_radius, logo_y - inner_radius + logo_size // 2,
         center_x + inner_radius, logo_y + inner_radius + logo_size // 2],
        fill=CORAL
    )
    
    # Baby silhouette
    draw_baby_silhouette(draw, center_x, logo_y + logo_size // 2, logo_size - 40, WHITE)
    
    # App name text
    try:
        # Try to use a nice font, fall back to default
        font_size = int(width / 12)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()
    except:
        font = None
    
    # App name
    app_name = "Baby Movement"
    
    # Calculate text bounding box for centering
    bbox = draw.textbbox((0, 0), app_name, font=font) if font else (0, 0, width * 0.6, font_size)
    text_width = bbox[2] - bbox[0]
    text_x = center_x - text_width // 2
    text_y = logo_y + logo_size + 150
    
    draw.text((text_x, text_y), app_name, fill=TEXT_DARK, font=font)
    
    # Tagline
    tagline = "Gentle exercises for your little one"
    tag_font_size = int(width / 24)
    try:
        tag_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", tag_font_size)
    except:
        tag_font = None
    
    bbox = draw.textbbox((0, 0), tagline, font=tag_font) if tag_font else (0, 0, width * 0.5, tag_font_size)
    text_width = bbox[2] - bbox[0]
    text_x = center_x - text_width // 2
    text_y = text_y + tag_font_size + 30
    
    draw.text((text_x, text_y), tagline, fill="#6B6B6B", font=tag_font)
    
    # Decorative elements at bottom
    deco_y = height - 200
    deco_size = 60
    
    # Small circles
    for i, x_offset in enumerate([-150, 0, 150]):
        color = [CORAL, SAGE, CORAL][i % 3]
        draw.ellipse(
            [center_x + x_offset - deco_size // 2, deco_y - deco_size // 2,
             center_x + x_offset + deco_size // 2, deco_y + deco_size // 2],
            fill=color
        )
    
    return img

def main():
    print("Generating app icon (1024x1024)...")
    icon = create_app_icon(1024)
    icon.save('/home/node/.openclaw/workspace/baby-movement-app/assets/icon.png', 'PNG')
    print("✓ icon.png created")
    
    print("Generating adaptive icon (1024x1024)...")
    adaptive = create_adaptive_icon(1024)
    adaptive.save('/home/node/.openclaw/workspace/baby-movement-app/assets/adaptive-icon.png', 'PNG')
    print("✓ adaptive-icon.png created")
    
    print("Generating splash screen (1284x2778)...")
    splash = create_splash_screen(1284, 2778)
    splash.save('/home/node/.openclaw/workspace/baby-movement-app/assets/splash.png', 'PNG')
    print("✓ splash.png created")
    
    print("\nAll assets generated successfully!")

if __name__ == '__main__':
    main()

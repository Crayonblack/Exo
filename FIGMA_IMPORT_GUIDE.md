# Figma Import Guide - EXO Energy Design System

This guide explains how to import the EXO Energy design tokens into Figma using various plugins.

## Design Token Export

The complete design system has been exported to `design-tokens.json` in the W3C Design Tokens Community Group format, which includes:

- ✅ Color palette (light/dark themes, semantic colors, data colors)
- ✅ Typography scale (font sizes, weights, line heights)
- ✅ Spacing system (8px grid)
- ✅ Border radius values
- ✅ Shadow definitions
- ✅ Glow effects (theme-aware)
- ✅ Gradient definitions
- ✅ Animation properties
- ✅ Component specifications

---

## Recommended Figma Plugins

### Option 1: **Tokens Studio for Figma** (Formerly Figma Tokens)
**⭐ RECOMMENDED** - Most comprehensive token support

**Features:**
- Full W3C Design Tokens format support
- Theme switching (light/dark)
- Automatic style generation
- Supports color, typography, spacing, shadows, and more
- Two-way sync capability

**Installation:**
1. In Figma, go to **Plugins** → **Find more plugins**
2. Search for "**Tokens Studio for Figma**"
3. Click **Install**

**Import Process:**
1. Open your Figma file
2. Run **Tokens Studio for Figma** plugin
3. Click **Settings** → **Add new token set**
4. Choose **Load from file**
5. Select the `design-tokens.json` file
6. Click **Import**
7. The plugin will create:
   - Color styles (semantic colors, data colors)
   - Text styles (typography scale)
   - Effect styles (shadows, glows)
   - Variables for spacing and radius

**Configuration:**
- Set `exo-energy` as the base token set
- Enable theme switching for light/dark modes
- Map tokens to Figma styles for easier component creation

**Plugin Link:** https://tokens.studio/

---

### Option 2: **Design Tokens Plugin**
Simpler alternative with good token support

**Features:**
- W3C format support
- Converts tokens to Figma styles
- Color, typography, and spacing support
- One-way import (tokens → Figma)

**Installation:**
1. **Plugins** → **Find more plugins**
2. Search for "**Design Tokens**"
3. Install the plugin

**Import Process:**
1. Run the **Design Tokens** plugin
2. Click **Import JSON**
3. Select `design-tokens.json`
4. Review token mappings
5. Click **Create Styles**

**Plugin Link:** https://www.figma.com/community/plugin/888356646278934516

---

### Option 3: **Style Dictionary to Figma**
For teams using Style Dictionary in their workflow

**Features:**
- Direct Style Dictionary JSON import
- Token aliasing support
- Batch style creation
- Good for design systems with existing SD configs

**Installation:**
1. **Plugins** → **Find more plugins**
2. Search for "**Style Dictionary**"
3. Install

**Note:** May require converting the design-tokens.json to Style Dictionary format

---

### Option 4: **JSON to Figma**
Generic JSON importer - more manual but flexible

**Features:**
- Import any JSON structure
- Map custom properties
- Useful for custom token structures
- Manual mapping required

**Installation:**
1. **Plugins** → **Find more plugins**
2. Search for "**JSON to Figma**"
3. Install

**Import Process:**
1. Run plugin
2. Load `design-tokens.json`
3. Manually map JSON paths to Figma properties
4. Create styles from mapped data

---

## Step-by-Step: Using Tokens Studio (Recommended)

### 1. Install and Setup

```
1. Open Figma
2. Go to Plugins → Find more plugins
3. Search "Tokens Studio for Figma"
4. Click Install
```

### 2. Import Design Tokens

```
1. In your Figma file, run "Tokens Studio for Figma"
2. Click the Settings icon (⚙️)
3. Go to "Token Sets" tab
4. Click "+ Add new set"
5. Name it "exo-energy"
6. Click "Import" → Choose file
7. Select design-tokens.json
8. Click "Import tokens"
```

### 3. Apply Theme Sets

```
1. In Tokens Studio panel, you'll see "exo-energy" token set
2. Enable the token set by toggling it on
3. For light/dark themes:
   - Create a "light" theme set
   - Create a "dark" theme set
   - Reference the base colors with theme-specific overrides
```

### 4. Generate Figma Styles

```
1. Click the "Styles" tab in Tokens Studio
2. Select tokens you want to convert:
   - Color tokens → Color styles
   - Typography tokens → Text styles
   - Shadow/glow tokens → Effect styles
3. Click "Create styles"
4. Tokens Studio will generate native Figma styles
```

### 5. Create Components

Now you can use the generated styles to build Figma components:

**Button Component:**
```
1. Create a frame: 40px height × auto width
2. Apply border-radius: lg (12px)
3. Apply color style: primary
4. Add text with typography: Body Default
5. Create variants for: primary, secondary, ghost, destructive
6. Create size variants: small (32px), medium (40px), large (48px)
```

**MetricCard Component:**
```
1. Create a card frame with gradient-card background
2. Add icon container: 48px × 48px with icon-container-lg styles
3. Add metric value text: typography Metric Large
4. Add label text: typography Body Small
5. Create color variants: solar, battery, load, grid-export, grid-import
6. Apply glow effects from effect styles
```

**Badge Component:**
```
1. Create auto-layout frame
2. Apply glass-effect background
3. Add padding: 8px horizontal, 4px vertical
4. Border radius: full (9999px)
5. Create variants: success, warning, error, info, neutral
6. Optional: add status dot (8px circle with semantic color)
```

---

## Manual Style Creation (If Not Using Plugins)

If you prefer manual setup or plugins don't work:

### Color Styles

1. **Create Color Palette:**
   - Create a dedicated "Colors" page
   - Create frames for: Semantic, Data, Foundation colors
   - Add color swatches with exact hex values from `design-tokens.json`

2. **Create Figma Styles:**
   - Select each color swatch
   - Right-click → **Create style**
   - Name using token path (e.g., `exo-energy/color/semantic/success`)

### Text Styles

1. **Typography Scale:**
   - Create text layers for each size: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
   - Set font: Inter
   - Set weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
   - Set line heights: tight (1.25), normal (1.5), relaxed (1.75)

2. **Create Figma Text Styles:**
   - Select text layer
   - Create text style
   - Name: `exo-energy/typography/[size]-[weight]`

### Effect Styles (Shadows & Glows)

1. **Shadow Styles:**
   - Create shape with shadow from `design-tokens.json`
   - Values are in `shadow` section (offsetX, offsetY, blur, spread, color)
   - Create style: `exo-energy/shadow/[sm|md|lg]`

2. **Glow Effects:**
   - Create shape
   - Add drop shadow effect with:
     - X: 0, Y: 0
     - Blur: 16px (standard) or 30px (large)
     - Color: from glow tokens (with opacity)
   - Create style: `exo-energy/effect/glow/[error|warning|success|info]`
   - Create separate versions for light/dark themes

---

## Component Library Structure

Recommended Figma file organization:

```
📁 EXO Energy Design System
  📄 🎨 Styles
    ├── Colors (all color swatches)
    ├── Typography (text samples)
    └── Effects (shadow/glow examples)
  
  📄 🧩 Components
    ├── Buttons (all variants)
    ├── Cards (all variants)
    ├── Badges (all variants)
    ├── MetricCards (all color variants)
    ├── ProgressBars (all sizes/colors)
    ├── Navigation (SideNav, BottomNav)
    └── Icons (icon containers)
  
  📄 📱 Patterns
    ├── Stat Cards (icon + metric)
    ├── Alert Items (icon + badge + content)
    └── Consumption Items (icon + progress)
  
  📄 📐 Layout Templates
    ├── Desktop (with SideNav)
    ├── Mobile (with BottomNav)
    └── Responsive Grid Examples
  
  📄 📖 Documentation
    ├── Color System Overview
    ├── Typography Specimens
    ├── Component Usage Guidelines
    └── Spacing/Layout Rules
```

---

## Creating Auto-Layout Components

### Button with Auto-Layout

```
1. Create frame (auto-layout horizontal)
2. Padding: 16px horizontal, 8px vertical (medium size)
3. Gap: 8px (between icon and text)
4. Hug contents
5. Border radius: lg (12px)
6. Add variants:
   - Property: Variant (primary, secondary, ghost, destructive)
   - Property: Size (small, medium, large)
   - Property: State (default, hover, pressed, disabled)
```

### MetricCard with Auto-Layout

```
1. Create frame (auto-layout vertical)
2. Padding: 24px
3. Gap: 16px
4. Add layers:
   - Icon container (48px circle with icon)
   - Label (text: Body Small, muted-foreground)
   - Value (text: Metric Large, auto-width)
   - Trend indicator (optional: text + icon)
5. Create color variants (solar, battery, load, etc.)
6. Apply glow effect based on variant
```

---

## Tips for Success

### DO:
- ✅ Use Tokens Studio for comprehensive import
- ✅ Create component variants for all states
- ✅ Use auto-layout for responsive components
- ✅ Organize with a clear naming convention
- ✅ Document component usage
- ✅ Create both light and dark theme versions
- ✅ Test components in actual layouts

### DON'T:
- ❌ Hardcode values - use styles and variables
- ❌ Skip component variants - creates inconsistency
- ❌ Forget to update tokens when design changes
- ❌ Mix naming conventions
- ❌ Create components without documentation

---

## Maintaining Sync Between Code and Figma

### Code → Figma (Updating Design System)

1. Update `design-tokens.json` when making code changes
2. Re-import into Tokens Studio
3. Update affected Figma components
4. Version your Figma file

### Figma → Code (Implementing New Designs)

1. Export new components as Figma dev mode specs
2. Match Tailwind classes to Figma styles
3. Use existing utility classes (glow-*, icon-container-*, etc.)
4. Update design-tokens.json if new tokens needed

---

## Troubleshooting

**Issue: Plugin won't import tokens**
- Check JSON validity at jsonlint.com
- Ensure file follows W3C Design Tokens format
- Try a different plugin (Tokens Studio vs Design Tokens)

**Issue: Colors don't match**
- Verify hex values in design-tokens.json
- Check if theme (light/dark) is correctly applied
- Ensure opacity values are set correctly

**Issue: Glows don't look right**
- Figma drop shadows need X:0, Y:0 for glows
- Check blur radius (16px standard, 30px large)
- Verify color opacity (0.3 dark, 0.6 light)

**Issue: Typography doesn't match**
- Install Inter font from Google Fonts
- Check font weights are available (400, 500, 600, 700)
- Verify line-height settings

---

## Additional Resources

- **W3C Design Tokens Spec**: https://tr.designtokens.org/format/
- **Tokens Studio Docs**: https://docs.tokens.studio/
- **Figma Variables Guide**: https://help.figma.com/hc/en-us/articles/15339657135383
- **Design Systems Guide**: https://www.designsystems.com/

---

**Need Help?**

If you encounter issues:
1. Check plugin documentation
2. Verify JSON structure matches W3C spec
3. Try manual import for specific tokens
4. Reach out to plugin support communities

Good luck building your Figma design system! 🎨

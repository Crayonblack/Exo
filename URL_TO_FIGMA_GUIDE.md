# URL to Figma Conversion Guide
## Converting Your EXO Dashboard to Figma Components

Since you have a **live running dev server**, you can use URL-to-Figma tools to automatically convert your entire dashboard into Figma!

---

## 🚀 Method 1: html.to.design Plugin (RECOMMENDED)

### Why This is Perfect for You:
- ✅ Your dev server is already running
- ✅ Converts live URL → editable Figma design
- ✅ Preserves all layouts, colors, typography
- ✅ Automatically creates component structure
- ✅ Handles all pages (Dashboard, Analytics, Usage, etc.)
- ✅ FREE to use

### Installation

**Step 1: Install Plugin**
```
1. Open Figma
2. Go to Plugins → Find more plugins
3. Search for "html.to.design"
4. Click Install
```

**Plugin Link:** https://www.figma.com/community/plugin/1159123024924461424/html-to-design

---

### How to Use

**Step 1: Get Your Preview URL**

In your Figma Make interface, you should see a preview of your dashboard. The URL should look something like:
```
https://[preview-id].figma-make.app
or
https://localhost:XXXX (if running locally)
```

**Step 2: Import Each Page**

Run the plugin for each route of your dashboard:

1. **Dashboard Page:**
   ```
   URL: [your-preview-url]/
   Page name: "Dashboard"
   ```

2. **Analytics Page:**
   ```
   URL: [your-preview-url]/analytics
   Page name: "Analytics"
   ```

3. **Usage Page:**
   ```
   URL: [your-preview-url]/usage
   Page name: "Usage"
   ```

4. **Alerts Page:**
   ```
   URL: [your-preview-url]/alerts
   Page name: "Alerts"
   ```

5. **System Health Page:**
   ```
   URL: [your-preview-url]/system-health
   Page name: "System Health"
   ```

6. **Settings Page:**
   ```
   URL: [your-preview-url]/settings
   Page name: "Settings"
   ```

**Step 3: Import Both Themes**

For light and dark mode:

1. **Set theme to Light** in your dashboard
2. Import all pages with suffix "- Light"
3. **Set theme to Dark** using the ThemeToggle
4. Import all pages again with suffix "- Dark"

**Step 4: Import Mobile Views**

1. Resize browser to mobile width (375px or 414px)
2. Import pages with suffix "- Mobile"

---

### What Gets Imported

The plugin will create:

✅ **Layout Structure**
- Exact positioning and sizing
- Grid layouts preserved
- Flex/auto-layout approximations

✅ **Components**
- All cards, buttons, badges
- Navigation components
- Metric cards
- Progress bars
- Charts (as images/shapes)

✅ **Styling**
- Colors (extracted as fills)
- Typography (fonts, sizes, weights)
- Borders and shadows
- Border radius

✅ **Content**
- All text content
- Icons (as SVGs where possible)
- Images

❌ **What Doesn't Import**
- Hover states (you'll need to create variants)
- Animations (you'll need to recreate)
- Interactive logic (Figma is static)
- Exact Tailwind classes (converted to Figma properties)

---

### Post-Import Refinement

After importing, you'll need to:

#### 1. Create Component Library

**Extract Repeated Elements:**
```
1. Select a button → Create Component (⌘⌥K)
2. Name it "Button"
3. Find all other buttons → Replace with component
4. Repeat for: Cards, Badges, MetricCards, etc.
```

#### 2. Apply Design Tokens

```
1. Import your design-tokens.json using Tokens Studio
2. Link imported components to token styles
3. Replace hardcoded values with token references
```

#### 3. Create Component Variants

**Example: Button Component**
```
1. Select Button component
2. Add variant property: "Variant" (primary, secondary, ghost, destructive)
3. Add variant property: "Size" (small, medium, large)
4. Add variant property: "State" (default, hover, pressed, disabled)
5. Duplicate and modify for each variant combination
```

#### 4. Add Auto-Layout

html.to.design creates frames with fixed positioning. Convert to auto-layout:

```
1. Select a Card component
2. Add Auto Layout (Shift+A)
3. Set padding, gap, direction
4. Set resizing: Hug or Fill container
```

#### 5. Organize Structure

Create proper layer organization:
```
📁 Pages
  📄 Dashboard - Desktop - Light
  📄 Dashboard - Desktop - Dark
  📄 Dashboard - Mobile - Light
  📄 Analytics - Desktop - Light
  ...

📁 Components
  🧩 Button
  🧩 Card
  🧩 Badge
  🧩 MetricCard
  🧩 ProgressBar
  🧩 SideNav
  🧩 BottomNav
  ...

📁 Styles
  🎨 Colors
  📝 Typography
  ✨ Effects
```

---

## 🎨 Method 2: Anima Plugin

Alternative if html.to.design doesn't work well.

### Installation
```
1. Figma → Plugins → Search "Anima"
2. Install "Anima - Export to Code"
3. Run plugin
4. Choose "Import from URL"
```

### Features
- Similar to html.to.design
- Might handle complex layouts differently
- Has AI-powered component detection

**Link:** https://www.animaapp.com/

---

## 🛠️ Method 3: Manual Screenshot + AI Rebuild

If URL import has issues:

### Using Screenshot Tools

1. **Take Screenshots:**
   - Full page screenshots of each route
   - Component screenshots in isolation
   - Both themes
   - Multiple viewport sizes

2. **Use Uizard:**
   - Upload screenshots
   - Auto-detects components
   - Exports to Figma

3. **Or Use Visily:**
   - Screenshot → editable design
   - Component library generation
   - Figma export

---

## 📋 Complete Workflow

### Phase 1: Preparation (5 minutes)

```
✓ Ensure dev server is running
✓ Get preview URL
✓ Install html.to.design plugin in Figma
✓ Create new Figma file "EXO Energy Design System"
```

### Phase 2: Import Pages (20 minutes)

```
For each page (Dashboard, Analytics, Usage, Alerts, System Health, Settings):
  ✓ Navigate to page URL
  ✓ Run html.to.design plugin
  ✓ Paste URL
  ✓ Import
  ✓ Rename frame appropriately
```

### Phase 3: Import Themes (10 minutes)

```
✓ Toggle to dark mode
✓ Re-import all pages with "- Dark" suffix
✓ Resize to mobile
✓ Import mobile views with "- Mobile" suffix
```

### Phase 4: Component Extraction (1 hour)

```
✓ Identify repeated elements
✓ Create components (Button, Card, Badge, etc.)
✓ Replace instances throughout design
✓ Add component variants
✓ Apply auto-layout
```

### Phase 5: Apply Design Tokens (30 minutes)

```
✓ Import design-tokens.json with Tokens Studio
✓ Link components to token styles
✓ Replace hardcoded values
✓ Verify theme switching works
```

### Phase 6: Documentation (30 minutes)

```
✓ Add component descriptions
✓ Document usage guidelines
✓ Create example compositions
✓ Add annotations for developers
```

**Total Time: ~3 hours** for complete Figma design system

---

## 🎯 Expected Results

After completing this workflow, you'll have:

✅ **Full Figma Design System** with:
- All 6 pages (Desktop + Mobile + Light + Dark)
- Complete component library (20+ components)
- Design tokens applied
- Component variants for all states
- Auto-layout applied
- Organized layer structure

✅ **Ready to Use** for:
- Design iterations
- Sharing with stakeholders
- Developer handoff
- Design documentation
- Future product work

---

## 💡 Pro Tips

### For Best Import Results:

**DO:**
- ✅ Import at 1x or 2x scale (consistent)
- ✅ Disable browser extensions that modify CSS
- ✅ Import with clean browser cache
- ✅ Use consistent viewport sizes
- ✅ Import one page at a time
- ✅ Name frames descriptively

**DON'T:**
- ❌ Import while animations are running
- ❌ Import at inconsistent zoom levels
- ❌ Import with browser dev tools open
- ❌ Batch import too many pages at once

### For Component Creation:

**DO:**
- ✅ Start with most-used components (Button, Card)
- ✅ Create master components in dedicated page
- ✅ Use component instances in page designs
- ✅ Name components semantically
- ✅ Add descriptions to components

**DON'T:**
- ❌ Create detached instances
- ❌ Duplicate instead of using instances
- ❌ Skip creating variants
- ❌ Hardcode values instead of using styles

---

## 🐛 Troubleshooting

### Issue: "Plugin can't access URL"

**Solution:**
- Ensure URL is publicly accessible
- Check if authentication/login required
- Try importing HTML code instead of URL

### Issue: "Import looks broken/wrong"

**Solution:**
- Check browser zoom is 100%
- Disable browser extensions
- Try importing at different viewport size
- Clear cache and retry

### Issue: "Components not detected"

**Solution:**
- Manually create components post-import
- Look for repeated element patterns
- Use Figma's "Find similar elements" feature

### Issue: "Colors don't match"

**Solution:**
- Check if dark mode is active
- Verify CSS variables are resolved
- Use design-tokens.json as source of truth

### Issue: "Layout is different"

**Solution:**
- html.to.design uses absolute positioning by default
- Convert to auto-layout manually
- Verify responsive breakpoints

---

## 📚 Additional Resources

- **html.to.design Docs:** https://html.to.design/
- **Figma Auto-layout:** https://help.figma.com/hc/en-us/articles/360040451373
- **Component Variants:** https://help.figma.com/hc/en-us/articles/360056440594
- **Design Tokens in Figma:** https://www.figma.com/community/file/1014492769138807597

---

## ✅ Success Checklist

Before you're done, verify:

- [ ] All 6 pages imported (Desktop)
- [ ] All 6 pages imported (Mobile)
- [ ] Light and dark themes captured
- [ ] 20+ components created
- [ ] Component variants added
- [ ] Auto-layout applied to flexible components
- [ ] Design tokens imported and linked
- [ ] Layer organization clean and logical
- [ ] Component descriptions added
- [ ] Example compositions created

---

**You now have a complete code → Figma workflow!** 🎉

The beauty of this approach is that you can:
1. Continue developing in code
2. Re-import to Figma whenever needed
3. Keep design and code in sync
4. Have the best of both worlds

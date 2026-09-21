# Auto Craft UI Theme

This document is the visual reference for all new public-facing pages and components in Auto Craft. New work should feel like part of the existing editorial, monochrome studio system rather than introducing a separate visual language.

## Design direction

Auto Craft uses a **quiet editorial / digital studio** aesthetic:

- Minimal, monochrome, and highly intentional.
- Warm paper-like backgrounds instead of pure white.
- Near-black typography and occasional full-black sections for contrast.
- Large serif headlines paired with tiny technical labels.
- Thin rules, open space, asymmetric compositions, and grid-based layouts.
- Motion is subtle and purposeful: reveal, float, slide, and hover inversion.

The interface should feel premium, calm, precise, and slightly raw—not glossy, colorful, card-heavy, or overly decorative.

## Color tokens

Use these existing colors consistently. Prefer these exact values over introducing new colors:

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f5f5f0` | Primary page and section background |
| Ink | `#0a0a0a` | Primary text, dark panels, primary buttons |
| Muted | `#aaaaaa` | Labels, supporting copy, inactive links |
| Rule | `#d0d0c8` | Borders, dividers, grid rules |
| Soft gray | `#e8e8e2` | Image panels, secondary bands, neutral surfaces |
| Pale gray | `#e0e0d8` | Watermarks, subtle decorative strokes |
| Dark muted | `#555555` | Footer metadata on black |
| Dark rule | `#1e1e1e` / `#333333` | Dividers and borders inside dark sections |

Default public-page pairing:

```text
background: #f5f5f0
color: #0a0a0a
border-color: #d0d0c8
```

Use `#0a0a0a` sections sparingly as visual anchors. On dark sections, use `#f5f5f0` for major text and `#555555` or `#aaaaaa` for supporting text.

## Typography

The project already loads the two typefaces below in `src/app/layout.tsx`:

### Display: Playfair Display

Use `var(--font-playfair)` for:

- Page and section headlines.
- Large statements and brand lockups.
- Card titles where the title is the visual focus.

Typical treatment:

```css
font-family: var(--font-playfair);
font-weight: 900;
line-height: 0.92–1;
letter-spacing: -0.02em;
```

Use italic, regular-weight Playfair (`font-style: italic; font-weight: 400`) to emphasize a phrase inside a headline. This is a recurring brand motif.

### Technical: Geist Mono

Use `var(--font-geist-mono)` for:

- Eyebrows and section labels.
- Navigation and button text.
- Descriptions, metadata, tags, process steps, and footer copy.
- Numbers, service indexes, and utility text.

Technical text is usually uppercase with generous tracking:

```css
font-size: 0.5rem–0.65rem;
letter-spacing: 0.08em–0.25em;
text-transform: uppercase;
line-height: 1.8–2.2;
```

Do not use a third typeface for new UI unless there is a strong, documented reason.

## Layout and spacing

- Use strong horizontal and vertical rhythm rather than dense component chrome.
- Desktop sections commonly use `60px` horizontal padding; mobile sections commonly use `24px`.
- Large sections often use `60px–100px` vertical padding. Hero sections can use `120px–160px` top spacing to account for the fixed navigation.
- Use thin `1px` rules to define sections and grid cells.
- Prefer CSS Grid for editorial layouts: two-column feature sections and three-column service grids are common patterns.
- Let the content breathe. Avoid wrapping every item in a rounded card.
- Use full-width bands and flush grid cells when a section benefits from a poster-like composition.
- Keep content widths controlled with `max-width` where long copy could become difficult to scan.

Common responsive behavior:

- Desktop grids collapse to one column on small screens.
- Desktop `border-right` rules become `border-bottom` rules on stacked mobile cells.
- Desktop padding reduces to `24px` horizontal and approximately `60px–80px` vertical on mobile.
- Large headline sizes should use `clamp(...)` and remain expressive without overflowing.
- Preserve the visual order and hierarchy when stacking; do not simply shrink the desktop layout.

## Component patterns

### Navigation

- Fixed to the top with a high stacking order.
- Paper background and a bottom `1px` Rule border.
- Wordmark uses bold Playfair, uppercase, and near-black.
- Links use small uppercase Geist Mono with wide tracking.
- Inactive links are Muted and transition to Ink on hover.
- Mobile navigation uses a minimal three-line hamburger and a paper dropdown.

### Hero sections

- Use a large Playfair statement as the main visual element.
- Place a small uppercase mono eyebrow above it.
- Align supporting copy and the primary action toward the lower portion of the hero.
- A faint oversized outline watermark, such as `AC`, is appropriate as a background layer.
- Decorative layers must remain non-interactive and behind readable content.

### Buttons and links

Primary button:

```text
background: #0a0a0a
color: #f5f5f0
border: 1px solid #0a0a0a
small uppercase Geist Mono label
wide horizontal padding, usually around 18px 40px
```

On hover, invert it to Paper background with Ink text. Secondary buttons can be transparent with a Rule or Ink border and the same inversion behavior.

Use short action labels such as `Start a Project`, `Explore`, or `View More`. Arrow glyphs are acceptable as small directional accents.

### Cards and grids

- Cards are usually open grid cells, not floating rounded containers.
- Use Rule borders to separate cells.
- A service card may invert from Paper to Ink on hover; all text and small rules must invert with it.
- Use generous internal padding, typically `52px` desktop and `24px` mobile horizontal padding.
- Index labels and descriptions should remain mono and understated.

### Dark sections and footer

- Use Ink backgrounds for strong transitions, CTAs, and the footer.
- Use Paper for large dark-section headlines and muted gray for supporting copy.
- Keep dark areas typographically sparse; contrast should come from the color block and scale, not extra decoration.

### Images

- Images should support the editorial composition rather than look like generic stock photography.
- Use neutral or softly desaturated treatment when appropriate.
- Image panels can use Soft gray backgrounds and Rule borders.
- Use `object-fit: cover` for portrait or founder imagery when the crop is intentional.

## Motion and interaction

Motion should communicate hierarchy and state, not add noise.

- Use Framer Motion patterns already present in the project for page-entry and in-view reveals.
- Preferred reveal: opacity `0 → 1` with a small upward movement, around `20px–30px`.
- Stagger related elements lightly, usually around `0.1s–0.15s` between items.
- Use smooth easing such as `[0.22, 1, 0.36, 1]` for UI movement.
- Keep hover transitions around `0.2s–0.3s`.
- Background watermark motion should be extremely subtle.
- Respect touch devices: hover-only effects must not be required to understand or use the page.

The project includes a custom cursor on pointer devices. New interactive elements should still have clear hover/focus states and must remain usable when the custom cursor is disabled on touch devices.

## Accessibility and implementation rules

- Maintain semantic headings and landmark elements (`header`, `nav`, `main`, `section`, `footer`).
- Keep text contrast strong: Ink on Paper and Paper on Ink are the preferred pairs.
- Do not communicate meaning through hover color alone.
- Provide visible keyboard focus styles even though the desktop custom cursor is present.
- Keep interactive targets comfortably tappable on mobile.
- Use `aria-hidden="true"` for decorative watermarks and purely visual motion.
- Avoid disabling scrolling, text selection, or native interaction unless the existing component pattern requires it.

## Avoid

- Bright accent colors, gradients, neon effects, glassmorphism, and glossy shadows.
- Rounded cards, pills, or excessive corner radii unless a specific existing pattern requires them.
- Heavy drop shadows and overly loud animation.
- Large body text in the mono face; reserve it for technical/supporting content.
- Pure white backgrounds when Paper is appropriate.
- Ad hoc colors or typography that do not map to the tokens above.
- Dense layouts that remove the generous whitespace characteristic of the site.

## New-page checklist

Before considering a new page complete, verify that it:

- Uses Paper, Ink, Muted, Rule, and Soft gray as its primary visual palette.
- Uses Playfair for display headlines and Geist Mono for utility/supporting text.
- Has clear section rules and generous spacing.
- Uses an editorial grid or purposeful full-width composition.
- Includes responsive one-column behavior for small screens.
- Uses restrained Framer Motion reveals where motion adds meaning.
- Has button/link states consistent with the black-to-paper inversion pattern.
- Preserves semantic structure, focus visibility, and readable contrast.

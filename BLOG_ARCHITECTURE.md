# Blog content architecture

`src/data/blog-posts.json` is the content source. New posts should use the
block-based `content` array described by `src/data/blog-post.schema.json`.
The renderer also accepts the older `sections` shape, so existing posts can be
updated gradually without breaking their URLs or pages.

## Recommended post shape

- Metadata: `slug`, `kicker`, `title`, `subtitle`, `excerpt`, `category`, `tags`.
- Publishing: `publishedAt`, `updatedAt`, and `readingTime` in the post header.
- Identity: `author.name`, `author.role`, and `author.image`.
- Hero: optional `image` for the article header.
- Body: `content`, an ordered list of blocks.
- Summary: `takeaways`, usually 3 concise points.

## Body blocks

- `heading`: section heading, level `2` or `3`.
- `paragraph`: one complete paragraph. Use multiple blocks rather than one very long string.
- `list`: bullet or numbered list with at least two items.
- `image`: inline image with a meaningful `alt` and optional caption.
- `quote`: a short quote with optional attribution.
- `callout`: a useful definition, warning, checklist, or key insight.
- `divider`: visual separation between major parts.

## Editorial length guide

The schema does not force every post to be the same length. A useful default is
5–8 body sections, 2–4 paragraphs per major section, and 1–2 lists where they
clarify a decision. Aim for roughly 900–1,600 words for a substantial note;
shorter posts are valid when the idea is genuinely narrow. Add images when they
explain a concept, show a result, or create a useful pause—not just to increase
length.

## Generation rules

1. Start with one reader, one problem, and one promise.
2. Write an opening that establishes the problem before the first heading.
3. Use headings to create a clear argument, not a collection of unrelated tips.
4. Keep paragraphs focused on one idea; use lists for scannable criteria or steps.
5. End with practical takeaways that are supported by the body.
6. Use local image paths under `public/images/blog` and descriptive alt text.
7. Validate generated JSON against `blog-post.schema.json` before publishing.

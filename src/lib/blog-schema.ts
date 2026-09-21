export type BlogImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type BlogBlock =
  | { type: 'heading'; level?: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; style?: 'bullet' | 'number'; items: string[] }
  | { type: 'image'; image: BlogImage }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'callout'; label?: string; text: string; items?: string[] }
  | { type: 'divider' };

export type LegacyBlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogAuthor = {
  name: string;
  role: string;
  image: string;
};

export type BlogPost = {
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  image?: string | null;
  author: BlogAuthor;
  /** Preferred format for new posts. */
  content?: BlogBlock[];
  /** Supported so existing blog-posts.json files do not need a breaking migration. */
  sections?: LegacyBlogSection[];
  takeaways: string[];
};

export type NormalizedBlogPost = Omit<BlogPost, 'content' | 'sections'> & {
  content: BlogBlock[];
};

function sectionsToBlocks(sections: LegacyBlogSection[]): BlogBlock[] {
  return sections.flatMap((section) => [
    { type: 'heading', level: 2, text: section.heading },
    ...section.paragraphs.map((text) => ({ type: 'paragraph' as const, text })),
    ...(section.bullets?.length
      ? [
          {
            type: 'list' as const,
            style: 'bullet' as const,
            items: section.bullets,
          },
        ]
      : []),
  ]);
}

export function normalizeBlogPost(post: BlogPost): NormalizedBlogPost {
  const { content, sections, ...metadata } = post;

  return {
    ...metadata,
    content: content?.length ? content : sectionsToBlocks(sections ?? []),
  };
}

export function normalizeBlogPosts(posts: BlogPost[]): NormalizedBlogPost[] {
  return posts.map(normalizeBlogPost);
}

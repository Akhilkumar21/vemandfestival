import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  ogImage?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  keywords,
  ogImage = 'https://vemandfestival.vercel.app/images/our-lady-of-rosary-japamala-matha-statue.jpeg',
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create a meta tag by name or property
    const setMetaTag = (attr: 'name' | 'property', key: string, value: string) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.content = value;
    };

    // 2. Meta Description & Keywords
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Canonical URL
    const canonicalUrl = `https://vemandfestival.vercel.app${canonicalPath === '/' ? '' : canonicalPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 6. Google Search Thumbnail & Image Source
    setMetaTag('name', 'thumbnail', ogImage);
    let imageSrcLink = document.querySelector('link[rel="image_src"]') as HTMLLinkElement | null;
    if (!imageSrcLink) {
      imageSrcLink = document.createElement('link');
      imageSrcLink.rel = 'image_src';
      document.head.appendChild(imageSrcLink);
    }
    imageSrcLink.href = ogImage;
  }, [title, description, canonicalPath, keywords, ogImage]);

  return null;
};


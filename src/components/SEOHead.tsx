import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://desirerealty.in';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
}

export const SEOHead = ({ title, description, image }: SEOHeadProps) => {
  const { pathname } = useLocation();
  // Netlify serves the react-snap folder output at a trailing-slash URL and 301s
  // the no-slash form to it. Normalize the canonical to that slash form so it points
  // at the final, non-redirecting URL (root `/` stays as-is).
  const slashPath = pathname === '/' ? '/' : pathname.replace(/\/?$/, '/');
  const canonical = `${BASE_URL}${slashPath}`;
  const ogImage = image || `${BASE_URL}/og-image.jpg`;

  return (
    <Helmet>
      <title>{title} | Desire Realty</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {/* Per-route Twitter tags — override the generic site-level defaults in index.html */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {/* Preload the page-specific hero so it becomes the LCP candidate (only when a real image is passed) */}
      {image && (
        <link rel="preload" as="image" href={image} fetchPriority="high" />
      )}
    </Helmet>
  );
};

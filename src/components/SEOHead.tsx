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
  const canonical = `${BASE_URL}${pathname}`;
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
    </Helmet>
  );
};

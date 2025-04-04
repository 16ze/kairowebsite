"use client";

import Script from "next/script";

interface OrganizationStructuredDataProps {
  url: string;
  logo: string;
  name: string;
}

export function OrganizationStructuredData({
  url,
  logo,
  name,
}: OrganizationStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs: [
      "https://twitter.com/kairoagency",
      "https://www.linkedin.com/company/kairo-agency",
      "https://www.instagram.com/kairoagency",
    ],
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebsiteStructuredDataProps {
  url: string;
  name: string;
  description: string;
}

export function WebsiteStructuredData({
  url,
  name,
  description,
}: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ServiceStructuredDataProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed: string;
}

export function ServiceStructuredData({
  name,
  description,
  provider,
  areaServed,
}: ServiceStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider.name,
      url: provider.url,
    },
    areaServed,
  };

  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  url: string;
}

export function ArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  url,
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: publisher.name,
      logo: {
        "@type": "ImageObject",
        url: publisher.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

import React from 'react';
import { JsonLd } from './JsonLd';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb component that injects JSON-LD for search engine rich results.
 * Each item should have a name and an absolute or site-relative URL.
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `https://www.chocorot.net${item.item}`,
    })),
  };

  return <JsonLd data={jsonLd} />;
};

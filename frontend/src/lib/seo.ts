import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://govtprep.in';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  canonical,
  ogType = 'website',
  image = '/images/og-default.png',
  keywords = [
    'Sarkari Result',
    'Government Jobs',
    'Sarkari Naukri',
    'SSC CGL',
    'RRB NTPC',
    'Bank PO',
    'UPSC CSE',
    'Admit Card',
    'Answer Key',
    'Mock Tests',
    'GovtPrep India',
  ],
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = `${title} | GovtPrep India`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'GovtPrep India',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: ogType,
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@GovtPrepIndia',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

export function generateJobPostingSchema(job: {
  title: string;
  description?: string;
  organizationName: string;
  organizationWebsite?: string;
  datePosted: Date | string;
  validThrough?: Date | string | null;
  employmentType?: string;
  location?: string;
  baseSalary?: string;
  qualification?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || job.title,
    identifier: {
      '@type': 'PropertyValue',
      name: job.organizationName,
      value: job.title,
    },
    datePosted: typeof job.datePosted === 'string' ? job.datePosted : job.datePosted.toISOString(),
    validThrough: job.validThrough
      ? typeof job.validThrough === 'string'
        ? job.validThrough
        : job.validThrough.toISOString()
      : undefined,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.organizationName,
      sameAs: job.organizationWebsite || 'https://govtprep.in',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: job.location || 'India',
      },
    },
    educationRequirements: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: job.qualification || 'Degree',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

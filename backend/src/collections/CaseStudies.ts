import { CollectionConfig } from 'payload';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'theme', 'context'],
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL}/ventures/${data.slug}`,
    },
    preview: (data) => `${process.env.NEXT_PUBLIC_SITE_URL}/ventures/${data.slug}`,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier, e.g. "trusted-research-environment"',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .replace(/-+/g, '-')
                .trim();
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'summary',
      type: 'richText',
      label: 'Summary Outcome',
      required: true,
      admin: { description: 'Short description shown on listing cards.' },
    },
    {
      name: 'theme',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Research Collaboration / TRE"' },
    },
    {
      name: 'context',
      type: 'richText',
      required: true,
      admin: { description: 'e.g. "Multi-institutional research consortium"' },
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Upload or select image.' },
    },
    {
      name: 'overviewContext',
      label: 'Overview & Context',
      type: 'richText',
    },
    {
      name: 'environmentModel',
      label: 'Environment Model',
      type: 'richText',
    },
    {
      name: 'governanceControls',
      label: 'Governance & Controls',
      type: 'richText',
    },
    {
      name: 'standardsInteroperability',
      label: 'Standards & Interoperability',
      type: 'richText',
    },
    {
      name: 'outcomesImpact',
      label: 'Outcomes & Impact',
      type: 'richText',
    },
    {
      name: 'partnershipRelevance',
      label: 'Partnership Relevance',
      type: 'richText',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark as a Featured Article.' },
    },
    // SEO
    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'text',
      admin: {
        description: 'Overrides the page title in search engine results. Leave blank to use the article title.',
      },
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'textarea',
      admin: {
        description: 'Short description for search engine results.',
      },
    },
  ],
};
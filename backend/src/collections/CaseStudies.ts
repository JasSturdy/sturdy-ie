import { CollectionConfig } from 'payload';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'theme', 'context', 'period'],
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
    },
    {
      name: 'summary',
      type: 'textarea',
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
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Multi-institutional research consortium"' },
    },
    {
      name: 'period',
      type: 'text',
      admin: { description: 'e.g. "2024"' },
    },
    {
      name: 'img',
      type: 'text',
      required: true,
      admin: { description: 'Full image URL' },
    },
    {
      name: 'overviewContext',
      label: 'Overview & Context',
      type: 'textarea',
    },
    {
      name: 'environmentModel',
      label: 'Environment Model',
      type: 'textarea',
    },
    {
      name: 'governanceControls',
      label: 'Governance & Controls',
      type: 'textarea',
    },
    {
      name: 'standardsInteroperability',
      label: 'Standards & Interoperability',
      type: 'textarea',
    },
    {
      name: 'outcomesImpact',
      label: 'Outcomes & Impact',
      type: 'textarea',
    },
    {
      name: 'partnershipRelevance',
      label: 'Partnership Relevance',
      type: 'textarea',
    },
  ],
};
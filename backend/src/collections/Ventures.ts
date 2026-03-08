import { CollectionConfig } from 'payload';

export const Ventures: CollectionConfig = {
  slug: 'ventures',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'slug'],
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
            // Auto-generate from title if slug is empty
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
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Upload or select image.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Exploring', value: 'Exploring' },
        { label: 'Active', value: 'Active' },
        { label: 'Relaunching', value: 'Relaunching' },
      ],
    },
    {
      name: 'shortOverview',
      label: 'Short Overview',
      type: 'textarea',
      admin: { description: 'Short intro shown in the hero section of the detail page.' },
    },
    {
      name: 'ventureOverview',
      label: 'Venture Overview',
      type: 'richText',
      admin: { description: 'First sentence is also used as the card summary on the index page.' },
    },
    {
      name: 'problemSpace',
      type: 'richText',
    },
    {
      name: 'innovationDirection',
      type: 'richText',
    },
    {
      name: 'dataAnalytics',
      label: 'Data & Analytics Dimension',
      type: 'richText',
    },
    {
      name: 'collaborationSought',
      label: 'Collaboration Sought',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Looking for aligned research partners',
          value: 'research-partners',
        },
        {
          label: 'Seeking platform integration partners',
          value: 'platform-integration',
        },
        {
          label: 'Exploring pilots in regulated environments',
          value: 'regulated-pilots',
        },
      ],
      admin: {
        description: 'Select the type of collaboration being sought.',
      },
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
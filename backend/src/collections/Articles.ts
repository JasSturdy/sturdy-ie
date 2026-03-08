import { CollectionConfig } from 'payload';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'flagship'],
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Governance & Compliance', value: 'Governance & Compliance' },
        { label: 'Research Collaboration', value: 'Research Collaboration' },
        { label: 'Interoperability & Standards', value: 'Interoperability & Standards' },
        { label: 'Preventive Health Innovation', value: 'Preventive Health Innovation' },
        { label: 'AI & Regulated Data', value: 'AI & Regulated Data' },
      ],
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'Jason Sturdy',
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Upload or select image.' },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        description: 'Publication date.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'text',
      required: true,
      admin: { description: 'Short summary shown on the listing card.' },
    },
    {
      name: 'flagship',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark as a Cornerstone Article.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark as a Featured Article.' },
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'richText',
          required: true,
        },
      ],
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
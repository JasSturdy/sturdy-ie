import { CollectionConfig } from 'payload';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'flagship'],
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
        description: 'URL-safe identifier, e.g. "reframing-three-wise-monkeys-data-governance"',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Governance & Compliance',      value: 'Governance & Compliance'      },
        { label: 'Research Collaboration',        value: 'Research Collaboration'        },
        { label: 'Interoperability & Standards',  value: 'Interoperability & Standards'  },
        { label: 'Preventive Health Innovation',  value: 'Preventive Health Innovation'  },
        { label: 'AI & Regulated Data',           value: 'AI & Regulated Data'           },
      ],
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: { description: 'Display date, e.g. "June 2025"' },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'Jason Sturdy',
    },
    {
      name: 'image',
      type: 'text',
      required: true,
      admin: { description: 'Full image URL' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
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
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
};
import type { CollectionConfig } from 'payload';

export const Ventures: CollectionConfig = {
  slug: 'ventures',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'slug'],
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
        description: 'URL-safe identifier, e.g. "preventive-health-platform"',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Exploring',   value: 'Exploring'   },
        { label: 'Active',      value: 'Active'       },
        { label: 'Relaunching', value: 'Relaunching'  },
      ],
    },
    {
      name: 'headerIntro',
      type: 'textarea',
      admin: { description: 'Short intro shown in the hero section of the detail page.' },
    },
    {
      name: 'ventureOverview',
      type: 'textarea',
      admin: { description: 'First sentence is also used as the card summary on the index page.' },
    },
    {
      name: 'problemSpace',
      type: 'textarea',
    },
    {
      name: 'innovationDirection',
      type: 'textarea',
    },
    {
      name: 'dataAnalytics',
      label: 'Data & Analytics Dimension',
      type: 'textarea',
    },
    {
      name: 'collaboration',
      label: 'Collaboration Opportunities',
      type: 'textarea',
    },
  ],
};
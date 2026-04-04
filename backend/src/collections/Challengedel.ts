import type { CollectionConfig } from 'payload';

export const Challenge: CollectionConfig = {
  slug: 'challenge',
  admin: {
    useAsTitle: 'heading',
    defaultColumns: ['heading', 'badge', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
        return `${base.replace(/\/$/, '')}/?preview=true&id=${data?.id ?? ''}`
      },
    },
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      return `${base.replace(/\/$/, '')}/?preview=true&id=${doc?.id ?? ''}`
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Challenge',
      required: true,
      admin: { description: 'Small label shown next to the green dot (e.g. "Challenge").' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Governance-led transformation in regulated ecosystems',
      admin: { description: 'Main section heading. The highlighted (lime) portion is set separately.' },
    },
    {
      name: 'headingHighlight',
      label: 'Heading Highlight',
      type: 'text',
      defaultValue: 'Governance-led',
      admin: { description: 'The portion of the heading rendered in lime (#c5f018). Must match a substring of Heading.' },
    },
    {
      name: 'intro',
      type: 'text',
      required: true,
      defaultValue: 'Across regulated environments, the challenge is not technology.\nIt is aligning governance, systems, and operations so data can be used in practice.',
      admin: { description: 'Short paragraph below the heading (left column).' },
    },
    {
      name: 'expertiseItems',
      label: 'Expertise Cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      admin: { description: 'The 2Ã—2 grid of expertise cards. Supports up to 4 items.' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'text',
          required: true,
          admin: { description: 'Short supporting sentence shown beneath the title.' },
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Governance (shield)',        value: 'governance'       },
            { label: 'Infrastructure (database)',  value: 'infrastructure'   },
            { label: 'Collaboration (people)',     value: 'collaboration'    },
            { label: 'Interoperability (arrows)',  value: 'interoperability' },
          ],
          admin: { description: 'Choose the icon to display on this card.' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Large image shown in the right column.' },
    },
    {
      name: 'imageCaption',
      type: 'text',
      defaultValue: 'Executive delivery across public sector, financial services, and health systems',
      admin: { description: 'Small caption rendered below the image.' },
    },
    {
      name: 'ctaLabel',
      label: 'CTA Button Label',
      type: 'text',
      defaultValue: 'Explore My Work',
      admin: { description: 'Text on the call-to-action button.' },
    },
    {
      name: 'ctaHref',
      label: 'CTA Button URL',
      type: 'text',
      defaultValue: '/case-studies',
      admin: { description: 'Where the CTA button links to.' },
    },
    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'text',
      admin: { description: 'Overrides the page <title>. Leave blank to use Heading.' },
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'textarea',
      admin: { description: 'Short description for search engine results.' },
    },
  ],
};

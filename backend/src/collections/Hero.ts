import type { CollectionConfig } from 'payload';

export const Hero: CollectionConfig = {
  slug: 'hero',
  admin: {
    useAsTitle: 'heading',
    defaultColumns: ['heading', 'subheading', 'updatedAt'],
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
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Jason Sturdy',
      admin: { description: 'Main hero heading. The highlighted portion is set separately.' },
    },
    {
      name: 'headingHighlight',
      label: 'Heading Highlight',
      type: 'text',
      defaultValue: 'Jason',
      admin: { description: 'Portion of the heading rendered in lime (#c5f018). Must match a substring of Heading (e.g. Jason with Sturdy in white).' },
    },

    {
      name: 'subheading',
      type: 'text',
      required: true,
      defaultValue: 'Building Trusted Systems from Policy to Practice',
      admin: { description: 'Large line shown beneath the main heading.' },
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Data Governance â€¢ Security Architecture â€¢ Operating Models â€¢ Digital Infrastructure',
      admin: { description: 'Dot-separated disciplines line beneath the subheading.' },
    },

    {
      name: 'sections',
      label: 'Content Sections',
      type: 'blocks',
      admin: {
        description: 'Add content sections to the hero. Each section has its own type and position slot.',
      },
      blocks: [

        {
          slug: 'richTextSection',
          labels: { singular: 'Rich Text', plural: 'Rich Text Sections' },
          fields: [
            {
              name: 'position',
              type: 'select',
              required: true,
              defaultValue: 'below-tagline',
              options: [
                { label: 'Above Heading',    value: 'above-heading' },
                { label: 'Below Heading',    value: 'below-heading' },
                { label: 'Below Subheading', value: 'below-subheading' },
                { label: 'Below Tagline',    value: 'below-tagline' },
                { label: 'Above CTA',        value: 'above-cta' },
                { label: 'Below CTA',        value: 'below-cta' },
              ],
              admin: { description: 'Where this section renders in the hero layout.' },
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              admin: { description: 'Supports bold, italic, and inline links.' },
            },
          ],
        },

        // Block 2 â€” Bullet List
        {
          slug: 'bulletList',
          labels: { singular: 'Bullet List', plural: 'Bullet Lists' },
          fields: [
            {
              name: 'position',
              type: 'select',
              required: true,
              defaultValue: 'below-tagline',
              options: [
                { label: 'Above Heading',    value: 'above-heading' },
                { label: 'Below Heading',    value: 'below-heading' },
                { label: 'Below Subheading', value: 'below-subheading' },
                { label: 'Below Tagline',    value: 'below-tagline' },
                { label: 'Above CTA',        value: 'above-cta' },
                { label: 'Below CTA',        value: 'below-cta' },
              ],
              admin: { description: 'Where this section renders in the hero layout.' },
            },
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              admin: { description: 'Add and reorder bullet items.' },
              fields: [
                {
                  name: 'text',
                  type: 'richText',
                  required: true,
                  admin: { description: 'Supports bold, italic, and inline links per item.' },
                },
              ],
            },
          ],
        },

      ],
    },

    {
      name: 'primaryCtaLabel',
      label: 'Primary CTA Label',
      type: 'text',
      defaultValue: 'View Case Studies',
      admin: { description: 'Text on the primary (lime) button.' },
    },
    {
      name: 'primaryCtaHref',
      label: 'Primary CTA URL',
      type: 'text',
      defaultValue: '/case-studies',
    },
    {
      name: 'secondaryCtaLabel',
      label: 'Secondary CTA Label',
      type: 'text',
      defaultValue: 'Explore Insights',
      admin: { description: 'Text on the secondary (outline) button.' },
    },
    {
      name: 'secondaryCtaHref',
      label: 'Secondary CTA URL',
      type: 'text',
      defaultValue: '/myinsights',
    },

    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait shown on the right. Leave blank to use the default local image.' },
    },
    {
      name: 'portraitAlt',
      label: 'Portrait Alt Text',
      type: 'text',
      defaultValue: 'Portrait of Jason Sturdy',
    },

    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'text',
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'textarea',
    },
  ],
};

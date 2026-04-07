import type { CollectionConfig } from 'payload'

export const ExecutiveProfile: CollectionConfig = {
    slug: 'executive-profile',
    admin: {
        useAsTitle: 'sectionHeading',
        defaultColumns: ['order', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#profile`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#profile`,
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'sectionHeading',
            type: 'text',
            defaultValue: 'Executive',
            admin: { description: 'First part of the section heading (rendered in lime green).' },
        },
        {
            name: 'sectionHeadingAccent',
            type: 'text',
            defaultValue: 'Profile',
            admin: { description: 'Second part of the section heading (rendered in white).' },
        },
        {
            name: 'paragraphs',
            type: 'array',
            label: 'Body Paragraphs',
            minRows: 1,
            admin: { description: 'Each item is one paragraph of body text.' },
            fields: [
                {
                    name: 'text',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'isBold',
                    label: 'Bold / Highlight',
                    type: 'checkbox',
                    defaultValue: false,
                    admin: { description: 'Renders this paragraph in bold white (for callout lines).' },
                },
            ],
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: { description: 'Background image shown on the right side.' },
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            admin: { description: 'Controls display order. Lower numbers appear first.' },
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
    ],
}

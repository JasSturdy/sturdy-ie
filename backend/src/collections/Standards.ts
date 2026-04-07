import type { CollectionConfig } from 'payload';

export const Standards: CollectionConfig = {
    slug: 'standards',
    admin: {
        useAsTitle: 'heading',
        defaultColumns: ['heading', 'badge', 'updatedAt'],
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
            name: 'badge',
            type: 'text',
            defaultValue: 'Standards',
            admin: { description: 'Small badge label above the heading (e.g. "Standards").' },
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'Standards,',
            admin: { description: 'First part of heading (rendered in white).' },
        },
        {
            name: 'headingAccent',
            label: 'Heading (accent part)',
            type: 'text',
            defaultValue: 'Frameworks & Ecosystems',
            admin: { description: 'Second part of heading (rendered in lime).' },
        },
        {
            name: 'body',
            type: 'richText',
            admin: { description: 'Paragraph text beneath the heading.' },
            defaultValue: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            version: 1,
                            children: [
                                {
                                    type: 'text',
                                    text: 'Operating within established standards and regulatory frameworks to ensure governance, interoperability, security, and trust across complex environments.',
                                    version: 1,
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            version: 1,
                            children: [
                                {
                                    type: 'text',
                                    text: 'They are infrastructure-level environments that integrate governance, security, and data exchange across organisations.',
                                    version: 1,
                                },
                            ],
                        },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                },
            },
        },
        {
            name: 'ctaLabel',
            label: 'CTA Button — Label',
            type: 'text',
            defaultValue: 'Explore Standards',
            admin: { description: 'Label for the call-to-action button shown below the cards.' },
        },
        {
            name: 'ctaHref',
            label: 'CTA Button — URL',
            type: 'text',
            defaultValue: '/standards',
            admin: { description: 'URL the CTA button links to.' },
        },
        {
            name: 'cards',
            label: 'Focus Cards',
            type: 'array',
            minRows: 1,
            admin: { description: 'The horizontally scrollable focus area cards.' },
            fields: [
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    admin: { description: 'URL-safe identifier (e.g. "data-protection-privacy").' },
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'tagline',
                    type: 'text',
                    required: true,
                    admin: { description: 'Short descriptor shown on card hover.' },
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    admin: { description: 'Background image for the card.' },
                },
                {
                    name: 'icon',
                    type: 'select',
                    required: true,
                    defaultValue: 'data-governance',
                    options: [
                        { label: 'Data Protection (Shield)', value: 'data-governance' },
                        { label: 'Security Architecture (Lock)', value: 'security-architecture' },
                        { label: 'AI / Regulation (Chip + AI)', value: 'regulatory-systems' },
                        { label: 'Interoperability (Connected nodes)', value: 'institutional-infrastructure' },
                        { label: 'Health (Medical cross)', value: 'health' },
                        { label: 'Research / Analytics (Bar chart)', value: 'research' },
                        { label: 'Financial (Euro)', value: 'financial' },
                        { label: 'European Data (Two people)', value: 'european-data' },
                    ],
                    admin: { description: 'Pick the icon that best represents this focus area.' },
                },
            ],
        },
    ],
};
import { CollectionConfig } from 'payload';

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
            defaultValue: 'Standards, Frameworks & Ecosystems',
            admin: { description: 'Main heading of the section.' },
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
                        { label: 'Data Governance (Database)',           value: 'data-governance'              },
                        { label: 'Security Architecture (Lock)',         value: 'security-architecture'        },
                        { label: 'Regulatory Systems (Document)',        value: 'regulatory-systems'           },
                        { label: 'Institutional Infrastructure (Globe)', value: 'institutional-infrastructure' },
                        { label: 'Health (Database + Arrow)',            value: 'health'                       },
                        { label: 'Research (Table Grid)',                value: 'research'                     },
                        { label: 'Financial (Dollar Sign)',              value: 'financial'                    },
                        { label: 'European Data (Network)',              value: 'european-data'                },
                    ],
                    admin: { description: 'Pick the icon that best represents this focus area.' },
                },
            ],
        },
    ],
};
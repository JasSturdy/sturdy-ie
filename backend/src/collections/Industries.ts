import type { CollectionConfig } from 'payload';

export const Industries: CollectionConfig = {
    slug: 'industries',
    admin: {
        useAsTitle: 'sectionLabel',
        defaultColumns: ['sectionLabel', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#capabilities`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#capabilities`,
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'sectionLabel',
            label: 'Section Label',
            type: 'text',
            defaultValue: 'Industries',
            admin: {
                description: 'Small badge label shown above the heading (e.g. "Industries").',
            },
        },
        {
            name: 'headingRegular',
            label: 'Heading (regular part)',
            type: 'text',
            required: true,
            defaultValue: 'Operating Across',
            admin: {
                description: 'First part of the heading rendered in normal white text.',
            },
        },
        {
            name: 'headingAccent',
            label: 'Heading (accent/lime part)',
            type: 'text',
            required: true,
            defaultValue: 'Regulated',
            admin: {
                description: 'Second part of the heading rendered in lime (#c5f018).',
            },
        },
        {
            name: 'headingLight',
            label: 'Heading (light trailing part)',
            type: 'text',
            defaultValue: 'Environments',
            admin: {
                description: 'Third / trailing part of the heading rendered in light white text.',
            },
        },
        {
            name: 'body',
            label: 'Body Text',
            type: 'richText',
            admin: {
                description: 'Descriptive paragraphs shown beside the heading.',
            },
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
                                    text: 'Across public sector, financial services, healthcare, and critical infrastructure environments, organisations operate under increasing regulatory expectations while managing complex data systems.',
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
                                    text: 'The challenge is not a lack of data or policy. It is making both work together in practice.',
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
                                    text: 'My work focuses on bridging that gap, designing systems and operating models that align governance, infrastructure, and real-world use.',
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
            admin: {
                description: 'The grid cards shown in the capabilities section (typically 4).',
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    admin: { description: 'Card heading (e.g. "Data Governance & Compliance").' },
                },
                {
                    name: 'description',
                    type: 'text',
                    required: true,
                    admin: { description: 'Short descriptor line shown beneath the title.' },
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    admin: { description: 'Background image for this card.' },
                },
            ],
        },
    ],
};

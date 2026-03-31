import { CollectionConfig } from 'payload';

export const Impact: CollectionConfig = {
    slug: 'impact',
    admin: {
        useAsTitle: 'heading',
        defaultColumns: ['heading', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#impact`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#impact`,
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
            defaultValue: 'Impact',
            admin: { description: 'Small badge label above the heading.' },
        },
        {
            name: 'headingAccent',
            label: 'Heading Accent',
            type: 'text',
            required: true,
            defaultValue: 'Why',
            admin: { description: 'Accent word rendered in lime (e.g. "Why").' },
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'This Matters',
            admin: { description: 'Main heading text rendered in white.' },
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
                                    version: 1,
                                    text: 'Across government, financial systems, healthcare, and research, the issue is rarely a lack of data or regulation. Both already exist.',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            version: 1,
                            children: [
                                {
                                    type: 'text',
                                    version: 1,
                                    text: 'The problem is that data is difficult to use, and regulatory intent is hard to translate into systems that work in practice. Too much effort is spent working around systems rather than benefiting from them.',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            version: 1,
                            children: [
                                {
                                    type: 'text',
                                    version: 1,
                                    text: 'My work focuses on aligning data, policy, and infrastructure so organisations can operate with clarity, confidence, and control. This enables better decision-making, stronger oversight, and more effective collaboration across institutions.',
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
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: { description: 'Main image displayed on the left side of the section.' },
        },
    ],
};
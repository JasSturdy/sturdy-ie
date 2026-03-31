import { CollectionConfig } from 'payload';

export const Perspective: CollectionConfig = {
    slug: 'perspective',
    admin: {
        useAsTitle: 'heading',
        defaultColumns: ['heading', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#perspective`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#perspective`,
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
            defaultValue: 'Perspective',
            admin: { description: 'Small badge label above the heading.' },
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'Designing Systems',
            admin: { description: 'First line of the heading (rendered in lime).' },
        },
        {
            name: 'headingLight',
            label: 'Heading (light part)',
            type: 'text',
            defaultValue: 'That Work in Practice',
            admin: { description: 'Second line of the heading (rendered in white, lighter weight).' },
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
                                    text: 'Addressing the gap between policy, systems, and real-world use requires more than technology.',
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
                                    text: 'It requires approaches that embed governance, standards, and collaboration into how systems are designed and operated.',
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
            label: 'CTA 1 Label',
            type: 'text',
            defaultValue: 'Explore Insights',
            admin: { description: 'Text on the primary call-to-action button.' },
        },
        {
            name: 'ctaHref',
            label: 'CTA 1 URL',
            type: 'text',
            defaultValue: '/myinsights',
            admin: { description: 'URL the primary CTA button links to.' },
        },
        {
            name: 'ctaLabel2',
            label: 'CTA 2 Label',
            type: 'text',
            defaultValue: 'Learn More',
            admin: { description: 'Text on the secondary call-to-action button.' },
        },
        {
            name: 'ctaHref2',
            label: 'CTA 2 URL',
            type: 'text',
            defaultValue: '/about',
            admin: { description: 'URL the secondary CTA button links to.' },
        },

        {
            name: 'images',
            label: 'Stacked Images',
            type: 'array',
            minRows: 1,
            maxRows: 3,
            admin: { description: 'Up to 3 images shown in the stacked animation on the right.' },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'alt',
                    type: 'text',
                    defaultValue: '',
                    admin: { description: 'Alt text for accessibility.' },
                },
            ],
        },
    ],
};
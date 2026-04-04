import type { CollectionConfig } from 'payload';

export const Cta: CollectionConfig = {
    slug: 'cta',
    admin: {
        useAsTitle: 'headingMiddle',
        defaultColumns: ['headingMiddle', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#cta`,
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
            name: 'headingStart',
            type: 'text',
            defaultValue: 'Building',
            admin: { description: 'First part of heading (white, light weight).' },
        },
        {
            name: 'headingMiddle',
            type: 'text',
            required: true,
            defaultValue: 'Trusted Systems',
            admin: { description: 'Middle part of heading (lime, medium weight).' },
        },
        {
            name: 'headingEnd',
            type: 'text',
            defaultValue: 'for Regulated Environments',
            admin: { description: 'Last part of heading (white).' },
        },
        {
            name: 'subheading',
            type: 'text',
            defaultValue: 'Where policy, infrastructure, and data must work in practice',
            admin: { description: 'Paragraph below the heading.' },
        },
        {
            name: 'buttonLabel',
            type: 'text',
            defaultValue: 'Explore My Work',
            admin: { description: 'CTA button text.' },
        },
        {
            name: 'buttonHref',
            type: 'text',
            defaultValue: '/case-studies',
            admin: { description: 'CTA button link (e.g. /case-studies).' },
        },
        {
            name: 'cards',
            label: 'Fan Cards',
            type: 'array',
            minRows: 3,
            maxRows: 3,
            admin: { description: 'Exactly 3 images shown in the fan layout at the bottom.' },
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
                    required: true,
                    admin: { description: 'Alt text for accessibility.' },
                },
            ],
        },
    ],
};

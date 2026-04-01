import { CollectionConfig } from 'payload';

export const Focus: CollectionConfig = {
    slug: 'focus',
    labels: {
        singular: 'Focus',
        plural: 'Focus',
    },
    admin: {
        useAsTitle: 'heading',
        defaultColumns: ['title', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#focus`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#focus`,
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
            defaultValue: 'Focus',
            admin: { description: 'Small badge label above the heading.' },
        },
        {
            name: 'headingAccent',
            label: 'Heading Accent',
            type: 'text',
            defaultValue: 'Core',
            admin: { description: 'Accent word rendered in lime.' },
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'Areas of Focus',
            admin: { description: 'Main heading text rendered in white.' },
        },
        {
            name: 'cards',
            type: 'array',
            minRows: 1,
            maxRows: 6,
            admin: { description: 'Focus area cards (max 6, displayed in 3-column grid).' },
            fields: [
                {
                    name: 'icon',
                    type: 'select',
                    required: true,
                    defaultValue: 'governance',
                    options: [
                        { label: 'Document (Governance)', value: 'governance' },
                        { label: 'Shield (Security)', value: 'security' },
                        { label: 'Database (Infrastructure)', value: 'infrastructure' },
                        { label: 'Activity / Pulse (Operating)', value: 'operating' },
                        { label: 'Globe (Regulatory)', value: 'regulatory' },
                        { label: 'Folder (Collaboration)', value: 'collaboration' },
                    ],
                    admin: { description: 'Icon displayed at the top of the card.' },
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    admin: { description: 'Card heading.' },
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    admin: { description: 'Short description shown beneath the card title.' },
                },
            ],
        },
    ],
};
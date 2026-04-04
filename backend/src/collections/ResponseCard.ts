import type { CollectionConfig } from 'payload';

export const ResponseCard: CollectionConfig = {
    slug: 'response_card',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['indexLabel', 'title', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#ventures`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#ventures`,
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'indexLabel',
            label: 'Index Label',
            type: 'text',
            required: true,
            defaultValue: '01',
            admin: { description: 'Display number shown top-left of the card (e.g. "01", "02").' },
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            defaultValue: 'Governance by Design',
            admin: { description: 'Card title text.' },
        },
        {
            name: 'body',
            type: 'text',
            defaultValue: 'Embedding policy and control into system architecture',
            admin: { description: 'Short description shown beneath the title.' },
        },
        {
            name: 'bars',
            type: 'select',
            required: true,
            defaultValue: '1',
            options: [
                { label: '1 bar', value: '1' },
                { label: '2 bars', value: '2' },
                { label: '3 bars', value: '3' },
            ],
            admin: { description: 'Number of lime bars shown top-right of the card (1â€“3).' },
        },
    ],
};

import { CollectionConfig } from 'payload';

export const FAQ: CollectionConfig = {
    slug: 'faq',
    admin: {
        useAsTitle: 'question',
        defaultColumns: ['question', 'order', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#faq`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#faq`,
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'question',
            type: 'text',
            required: true,
            admin: { description: 'The FAQ question text.' },
        },
        {
            name: 'answer',
            type: 'textarea',
            required: true,
            admin: { description: 'The answer to the question.' },
        },
        {
            name: 'order',
            type: 'number',
            required: true,
            defaultValue: 0,
            admin: { description: 'Controls display order (ascending). e.g. 1, 2, 3...' },
        },
    ],
};
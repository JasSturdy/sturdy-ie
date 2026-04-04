import type { CollectionConfig } from 'payload'

export const About: CollectionConfig = {
    slug: 'about',
    admin: {
        useAsTitle: 'heading',
        defaultColumns: ['heading', 'subtitle', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#about`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#about`,
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'About',
            admin: { description: 'Main heading text (e.g. "About").' },
        },
        {
            name: 'subtitle',
            type: 'textarea',
            required: true,
            defaultValue: 'Executive leadership across sovereign data, governance, and regulated systems',
            admin: { description: 'Subtitle paragraph shown on the right side.' },
        },
    ],
}

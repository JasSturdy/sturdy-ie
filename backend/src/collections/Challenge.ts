import { CollectionConfig } from 'payload';

export const Challenge: CollectionConfig = {
    slug: 'challenge',
    admin: {
        useAsTitle: 'heading',
        defaultColumns: ['heading', 'subheading', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#challenge`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#challenge`,
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
            defaultValue: 'Infrastructure',
            admin: { description: 'Small badge label above the heading (e.g. "Infrastructure").' },
        },
        {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'Bridging the Gap Between',
            admin: { description: 'First line of the heading (rendered in lime).' },
        },
        {
            name: 'headingLight',
            label: 'Heading (light part)',
            type: 'text',
            defaultValue: 'Policy and Practice',
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
                                    text: 'Across regulated environments, the challenge is not technology. It is aligning governance, systems, and operations so data can be used effectively in practice.',
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
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: { description: 'Image shown below the body text.' },
        },
        {
            name: 'imageCaption',
            label: 'Image Caption',
            type: 'text',
            admin: { description: 'Optional caption beneath the image.' },
        },
        {
            name: 'cards',
            label: 'Service Cards',
            type: 'array',
            minRows: 1,
            admin: { description: 'Cards shown in the right column.' },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'body',
                    type: 'text',
                    required: true,
                    admin: { description: 'Short descriptor line shown beneath the title.' },
                },
                {
                    name: 'icon',
                    type: 'select',
                    defaultValue: 'shield',
                    options: [
                        { label: 'Fragmented (custom polygon)', value: 'fragmented' },
                        { label: 'Server (legacy systems)',      value: 'server' },
                        { label: 'Network / Database',           value: 'network' },
                        { label: 'Shield + Check',               value: 'shieldCheck' },
                        { label: 'Shield (plain)',               value: 'shield' },
                        { label: 'Layers (Secure)',              value: 'layers' },
                        { label: 'Activity (Exchange)',          value: 'activity' },
                        { label: 'Globe (Regulated)',            value: 'globe' },
                    ],
                    admin: { description: 'Pick the icon that best represents this card.' },
                },
            ],
        },
    ],
};
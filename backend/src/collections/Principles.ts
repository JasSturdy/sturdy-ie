import { CollectionConfig } from 'payload';

export const Principles: CollectionConfig = {
    slug: 'principles',
    admin: {
        useAsTitle: 'sectionLabel',
        defaultColumns: ['sectionLabel', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#principles`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#principles`,
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
            defaultValue: 'Principles',
            admin: { description: 'Internal label to identify this document in the CMS list.' },
        },

        {
            name: 'exploreHeading',
            label: 'Explore Card — Heading',
            type: 'text',
            defaultValue: 'Explore My Work',
        },
        {
            name: 'exploreBody',
            label: 'Explore Card — Body',
            type: 'richText',
            defaultValue: {
                root: {
                    type: 'root',
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [{
                        type: 'paragraph',
                        version: 1,
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        children: [{
                            type: 'text',
                            version: 1,
                            text: 'Examples of systems, platforms, and environments designed for regulated ecosystems',
                            format: 0,
                            detail: 0,
                            mode: 'normal',
                            style: '',
                        }],
                    }],
                },
            },
        },
        {
            name: 'exploreCtaLabel',
            label: 'Explore Card — CTA Label',
            type: 'text',
            defaultValue: 'View Case Studies',
        },
        {
            name: 'exploreCtaHref',
            label: 'Explore Card — CTA URL',
            type: 'text',
            defaultValue: '/case-studies',
        },
        {
            name: 'exploreBackgroundImage',
            label: 'Explore Card — Background Image',
            type: 'upload',
            relationTo: 'media',
        },

        {
            name: 'items',
            label: 'Principle Cards',
            type: 'array',
            minRows: 1,
            maxRows: 8,
            admin: { description: 'Add, remove, or reorder cards here. Drag rows to reorder.' },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    admin: { description: 'Card title (e.g. "Trust").' },
                },
                {
                    name: 'body',
                    type: 'richText',
                    required: true,
                    admin: { description: 'Description shown in the active card.' },
                },
                {
                    name: 'icon',
                    type: 'select',
                    required: true,
                    defaultValue: 'trust',
                    options: [
                        { label: 'Trust (shield)', value: 'trust' },
                        { label: 'Control (settings)', value: 'control' },
                        { label: 'Standards (layers)', value: 'standards' },
                        { label: 'Resilience (database)', value: 'resilience' },
                    ],
                },
                {
                    name: 'bars',
                    type: 'number',
                    required: true,
                    defaultValue: 1,
                    min: 1,
                    max: 8,
                    admin: { description: 'Number of lime bars (1–8).' },
                },
            ],
        },
    ],
};
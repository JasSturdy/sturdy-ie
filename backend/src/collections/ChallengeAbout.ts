import type { CollectionConfig } from 'payload';

export const ChallengeAbout: CollectionConfig = {
    slug: 'approach',
    admin: {
        useAsTitle: 'sectionLabel',
        defaultColumns: ['sectionLabel', 'updatedAt'],
        livePreview: {
            url: () => `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#approach`,
        },
        preview: () =>
            `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/#approach`,
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
            defaultValue: 'Challenge',
            admin: { description: 'Internal label to identify this document in the CMS list.' },
        },
        {
            name: 'badge',
            type: 'text',
            defaultValue: 'Challenge',
            admin: { description: 'Small badge label above the heading (e.g. "Challenge").' },
        },
        {
            name: 'headingAccent',
            label: 'Heading (lime accent part)',
            type: 'text',
            defaultValue: 'How',
            admin: { description: 'First part of heading rendered in lime (e.g. "How").' },
        },
        {
            name: 'heading',
            label: 'Heading (white part)',
            type: 'text',
            defaultValue: 'I Work',
            admin: { description: 'Second part of heading rendered in white (e.g. "I Work").' },
        },
        {
            name: 'body',
            type: 'richText',
            admin: { description: 'Body paragraphs shown below the heading.' },
        },
        {
            name: 'exploreHeading',
            label: 'Explore Card â€” Heading',
            type: 'text',
            defaultValue: 'Explore My Work',
        },
        {
            name: 'exploreBody',
            label: 'Explore Card â€” Body',
            type: 'richText',
        },
        {
            name: 'exploreCtaLabel',
            label: 'Explore Card â€” CTA 1 Label',
            type: 'text',
            defaultValue: 'View Case Studies',
        },
        {
            name: 'exploreCtaHref',
            label: 'Explore Card â€” CTA 1 URL',
            type: 'text',
            defaultValue: '/case-studies',
        },
        {
            name: 'exploreCtaLabel2',
            label: 'Explore Card â€” CTA 2 Label',
            type: 'text',
            defaultValue: 'Explore Insights',
        },
        {
            name: 'exploreCtaHref2',
            label: 'Explore Card â€” CTA 2 URL',
            type: 'text',
            defaultValue: '/insights',
        },
        {
            name: 'exploreBackgroundImage',
            label: 'Explore Card â€” Background Image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'items',
            label: 'Challenge Cards',
            type: 'array',
            minRows: 1,
            maxRows: 8,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'body',
                    type: 'richText',
                    required: true,
                    admin: { description: 'Short tagline shown on the card.' },
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
                },
            ],
        },
        
    ],
};

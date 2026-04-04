import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
    slug: 'footer',
    label: 'Footer',
    access: { read: () => true },
    fields: [
        {
            name: 'tagline',
            type: 'textarea',
            required: true,
        },
        {
            name: 'copyright',
            type: 'text',
            required: true,
            defaultValue: 'Copyright Â© All Rights Reserved Jason Sturdy',
        },
        {
            name: 'ctaLabel',
            label: 'CTA Button Label',
            type: 'text',
            admin: { description: "e.g. \"Let's Connect\". Leave blank to hide the button." },
        },
        {
            name: 'ctaHref',
            label: 'CTA Button URL',
            type: 'text',
            admin: { description: 'e.g. "/contact" or "https://calendly.com/..."' },
        },
        {
            name: 'navItems',
            type: 'array',
            label: 'Nav Links',
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
            ],
        },
        {
            name: 'socials',
            type: 'array',
            label: 'Social Links',
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
            ],
        },
    ],
}

import type { CollectionConfig } from 'payload';
import {
  BoldFeature,
  ChecklistFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  RelationshipFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const MyInsight: CollectionConfig = {
  slug: 'myinsights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'flagship'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/myinsight/${data.slug}`,
    },
    preview: (data) =>
      `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/myinsight/${data.slug}`,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-filled from title. You can override it manually.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .replace(/-+/g, '-')
                .trim();
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Governance & Compliance', value: 'Governance & Compliance' },
        { label: 'Research Collaboration', value: 'Research Collaboration' },
        { label: 'Interoperability & Standards', value: 'Interoperability & Standards' },
        { label: 'Preventive Health Innovation', value: 'Preventive Health Innovation' },
        { label: 'AI & Regulated Data', value: 'AI & Regulated Data' },
      ],
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Featured image.' },
    },
    {
      name: 'date',
      type: 'text',
      admin: {
        description: 'Format: MM/YYYY e.g. 03/2025',
      },
    },
    {
      name: 'summary',
      label: 'Summary / Excerpt',
      type: 'richText',
      required: true,
      admin: { description: 'Short summary shown in the hero and on listing cards.' },
      editor: lexicalEditor({
        features: [
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          LinkFeature(),
          HorizontalRuleFeature(),
          UploadFeature(),
          RelationshipFeature(),
        ],
      }),
    },
    {
      name: 'flagship',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark as a Cornerstone Article.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark as a Featured Article.' },
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      admin: { description: 'Add, reorder, or remove sections freely.' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: { description: 'Section heading shown on the page.' },
        },
        {
          name: 'body',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: [
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              StrikethroughFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              UnorderedListFeature(),
              OrderedListFeature(),
              ChecklistFeature(),
              LinkFeature(),
              HorizontalRuleFeature(),
              UploadFeature(),
              RelationshipFeature(),
            ],
          }),
        },
      ],
    },
    // SEO
    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'text',
      admin: { description: 'Overrides the page <title>. Leave blank to use the article title.' },
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'textarea',
      admin: { description: 'Short description for search engine results.' },
    },
  ],
};

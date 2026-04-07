import type { CollectionConfig } from 'payload';
import {
  BlocksFeature,
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

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'theme', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/case-studies/${data.slug}`,
    },
    preview: (data) =>
      `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/case-studies/${data.slug}`,
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
      name: 'summary',
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
    {
      name: 'theme',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Research Collaboration / TRE"' },
    },
    {
      name: 'date',
      type: 'text',
      admin: { description: 'Format: MM/YYYY e.g. 03/2025', },
    },
    {
      name: 'period',
      type: 'text',
      admin: { description: 'Fallback period label if no date e.g. "Q1 2024"' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'sections',
      label: 'Body Sections',
      type: 'array',
      minRows: 0,
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
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'text',
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'textarea',
    },
  ],
};

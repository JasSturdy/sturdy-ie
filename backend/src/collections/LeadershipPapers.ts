import { CollectionConfig } from 'payload';
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

const richText = () =>
  lexicalEditor({
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
  });

export const LeadershipPapers: CollectionConfig = {
  slug: 'leadership-papers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/leadership-papers/${data.slug}`,
    },
    preview: (data) =>
      `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/leadership-papers/${data.slug}`,
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
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Governance & Compliance"' },
    },
    {
      name: 'date',
      type: 'text',
      admin: { description: 'Display date e.g. "July 1, 2026"' },
    },
    {
      name: 'summary',
      type: 'richText',
      required: true,
      editor: richText(),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'flagship',
      label: 'Cornerstone Paper',
      type: 'checkbox',
      defaultValue: false,
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
        },
        {
          name: 'body',
          type: 'richText',
          required: true,
          editor: richText(),
        },
      ],
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
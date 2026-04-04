import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  lexicalEditor,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  OrderedListFeature,
  UnorderedListFeature,
  LinkFeature,
  BlockquoteFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Ventures } from './collections/Ventures'
import { MyInsight } from './collections/MyInsight'
import { CaseStudies } from './collections/CaseStudies'
import { Hero } from './collections/Hero'
import { Challenge } from './collections/Challenge'
import { Response } from './collections/Response'
import { ResponseCard } from './collections/ResponseCard'
import { ChallengeAbout } from './collections/ChallengeAbout'
import { Standards } from './collections/Standards'
import { Cta } from './collections/Cta'
import { Footer } from './collections/Footer'
import { Industries } from './collections/Industries'
import { Application } from './collections/Application'
import { About } from './collections/About'
import { ExecutiveProfile } from './collections/ExecutiveProfile'
import { Perspective } from './collections/Perspective'
import { Impact } from './collections/Impact'
import { Focus } from './collections/Focus'
import { FAQ } from './collections/Faq'
import { LeadershipPapers } from './collections/LeadershipPapers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const config = buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.NEXT_PUBLIC_SITE_URL,
      collections: ['my-insight', 'case-studies', 'ventures', 'challenge', 'hero', 'industries', 'response', 'response-card', 'challenge-about', 'standards', 'cta', 'application', 'about', 'executive-profile', 'perspective', 'impact', 'focus', 'faq', 'leadership-papers'],
    },
  },
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://unnecessary-dahlia-beatrixbbc-c1438312.koyeb.app',
    'https://sturdy-ie-66rb.vercel.app',
    process.env.NEXT_PUBLIC_SITE_URL ?? '',
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://unnecessary-dahlia-beatrixbbc-c1438312.koyeb.app',
    'https://sturdy-ie-66rb.vercel.app',
    process.env.NEXT_PUBLIC_SITE_URL ?? '',
  ],
  collections: [Users, Media, Ventures, MyInsight, CaseStudies, Challenge, Hero, Industries, Response, ResponseCard, ChallengeAbout, Standards, Application, About, Cta, ExecutiveProfile, Perspective, Impact, Focus, FAQ, LeadershipPapers],
  globals: [Footer],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: (args) =>
            `${process.env.PAYLOAD_API_URL}/api/media/file/${args.filename}`,
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY!,
          secretAccessKey: process.env.S3_SECRET_KEY!,
        },
      },
    }),
  ],
})

export default config
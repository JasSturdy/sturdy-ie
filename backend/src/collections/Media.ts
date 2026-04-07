import type { CollectionConfig } from 'payload'

function sanitizeFilename(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ''

  const lastDot = trimmed.lastIndexOf('.')
  const hasExt = lastDot > 0 && lastDot < trimmed.length - 1
  const base = hasExt ? trimmed.slice(0, lastDot) : trimmed
  const ext = hasExt ? trimmed.slice(lastDot + 1).toLowerCase() : ''

  const safeBase = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'image'

  return ext ? `${safeBase}.${ext}` : safeBase
}

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation !== 'create' || !data) return data

        const raw = typeof data.filename === 'string' ? data.filename : ''
        const sanitized = sanitizeFilename(raw)
        if (sanitized) data.filename = sanitized

        return data
      },
    ],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
}

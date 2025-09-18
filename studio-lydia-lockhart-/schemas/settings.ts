import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'contactEmail', type: 'string', title: 'Contact Email'}),
    defineField({name: 'calendlyUrl', type: 'url', title: 'Calendly Link'}),
    defineField({name: 'logo', type: 'image', title: 'Logo'}),
    defineField({
      name: 'footer',
      type: 'object',
      title: 'Footer Settings',
      fields: [
        defineField({
          name: 'footerText',
          type: 'text',
          title: 'Footer Text',
          rows: 3,
        }),
        defineField({
          name: 'socialLinks',
          type: 'array',
          title: 'Social Media Links',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'platform',
                  type: 'string',
                  title: 'Platform',
                  options: {
                    list: [
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'Twitter', value: 'twitter'},
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'LinkedIn', value: 'linkedin'},
                      {title: 'YouTube', value: 'youtube'},
                      {title: 'TikTok', value: 'tiktok'},
                    ],
                  },
                }),
                defineField({
                  name: 'url',
                  type: 'url',
                  title: 'URL',
                }),
                defineField({
                  name: 'isVisible',
                  type: 'boolean',
                  title: 'Show Link',
                  initialValue: true,
                }),
              ],
              preview: {
                select: {
                  title: 'platform',
                  subtitle: 'url',
                  isVisible: 'isVisible',
                },
                prepare({title, subtitle, isVisible}) {
                  return {
                    title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Social Link',
                    subtitle: `${subtitle} ${!isVisible ? '(Hidden)' : ''}`,
                  }
                },
              },
            },
          ],
        }),
        defineField({
          name: 'copyrightText',
          type: 'string',
          title: 'Copyright Text',
          description: 'e.g., "© 2024 Your Name. All rights reserved."',
        }),
        defineField({
          name: 'additionalLinks',
          type: 'array',
          title: 'Additional Footer Links',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                  description: 'Use "/" for home, "#section-id" for anchor links, or full URLs',
                }),
                defineField({
                  name: 'isVisible',
                  type: 'boolean',
                  title: 'Show Link',
                  initialValue: true,
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'url',
                  isVisible: 'isVisible',
                },
                prepare({title, subtitle, isVisible}) {
                  return {
                    title,
                    subtitle: `${subtitle} ${!isVisible ? '(Hidden)' : ''}`,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
})

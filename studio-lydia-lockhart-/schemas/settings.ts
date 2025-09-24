import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'contactEmail', type: 'string', title: 'Contact Email'}),
    defineField({name: 'calendlyUrl', type: 'url', title: 'Calendly Link'}),
    defineField({
      name: 'seoSettings',
      type: 'object',
      title: 'SEO & Social Sharing',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
          title: 'Site Title',
          description: 'Default title for the website',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          title: 'Site Description',
          description: 'Default description for the website',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description:
            'Default image when sharing website links on social media (1200x630px recommended)',
        }),
      ],
    }),
    defineField({
      name: 'testimonialsBackgroundImage',
      type: 'image',
      title: 'Testimonials Background Image',
      description:
        'Optional background image for the testimonials section (will be phased/blended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactBackgroundImage',
      type: 'image',
      title: 'Contact Form Background Image',
      description:
        'Optional background image for the contact form section (will be phased/blended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pageVisibility',
      type: 'object',
      title: 'Page Visibility Settings',
      description: 'Control which pages appear in navigation and footer',
      fields: [
        defineField({
          name: 'showBlogPage',
          type: 'boolean',
          title: 'Show Blog Page',
          description: 'Show/hide Blog page in navigation and footer',
          initialValue: true,
        }),
        defineField({
          name: 'showFaqPage',
          type: 'boolean',
          title: 'Show FAQ Page',
          description: 'Show/hide FAQ page in navigation and footer',
          initialValue: true,
        }),
      ],
    }),
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

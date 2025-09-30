import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fieldsets: [
    {
      name: 'siteInfo',
      title: '🌐 Site Information',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'seo',
      title: '🔍 SEO & Social Sharing',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'contact',
      title: '📧 Contact Settings',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'navigation',
      title: '🧭 Page Visibility',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'footer',
      title: '🦶 Footer Settings',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'visual',
      title: '🎨 Visual Settings',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    // Site Information
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'The name of your website',
      fieldset: 'siteInfo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      type: 'url',
      title: 'Site URL',
      description:
        'The primary URL of your website (e.g., https://www.lydialockhartlifecoaching.co.uk)',
      fieldset: 'siteInfo',
      validation: (Rule) => Rule.required(),
    }),

    // SEO & Social Sharing
    defineField({
      name: 'seoSettings',
      type: 'object',
      title: 'SEO & Meta Tags',
      fieldset: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
          title: 'Default Page Title',
          description: 'Default title for pages without specific titles (60 characters max)',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          title: 'Default Meta Description',
          description:
            'Default description for pages without specific descriptions (160 characters max)',
          validation: (Rule) => Rule.max(160),
          rows: 3,
        }),
        defineField({
          name: 'keywords',
          type: 'array',
          title: 'SEO Keywords',
          description: 'Important keywords for your website',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'favicon',
          type: 'image',
          title: 'Favicon',
          description: 'Small icon displayed in browser tabs (32x32px recommended)',
          options: {
            accept: '.ico,.png,.svg',
          },
        }),
      ],
    }),
    defineField({
      name: 'socialSharing',
      type: 'object',
      title: 'Social Media Sharing',
      fieldset: 'seo',
      fields: [
        defineField({
          name: 'ogImage',
          type: 'image',
          title: 'Default Social Share Image',
          description:
            'Default image when sharing website links on social media (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'twitterHandle',
          type: 'string',
          title: 'Twitter Handle',
          description: 'Your Twitter username (without @)',
          validation: (Rule) =>
            Rule.regex(/^[A-Za-z0-9_]{1,15}$/).warning(
              'Should be a valid Twitter handle without @',
            ),
        }),
        defineField({
          name: 'facebookAppId',
          type: 'string',
          title: 'Facebook App ID',
          description: 'Optional: Facebook App ID for better social sharing',
        }),
      ],
    }),

    // Contact Settings
    defineField({
      name: 'contactEmail',
      type: 'string',
      title: 'Contact Email',
      description: 'Primary email address for contact form submissions',
      fieldset: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'calendlyUrl',
      type: 'url',
      title: 'Calendly Booking Link',
      description: 'Link to your Calendly scheduling page',
      fieldset: 'contact',
    }),
    defineField({
      name: 'phoneNumber',
      type: 'string',
      title: 'Phone Number',
      description: 'Optional: Display phone number',
      fieldset: 'contact',
    }),
    // Page Visibility
    defineField({
      name: 'pageVisibility',
      type: 'object',
      title: 'Navigation Control',
      description: 'Control which pages appear in navigation and footer',
      fieldset: 'navigation',
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
    // Footer Settings
    defineField({
      name: 'footer',
      type: 'object',
      title: 'Footer Content',
      fieldset: 'footer',
      fields: [
        defineField({
          name: 'footerText',
          type: 'text',
          title: 'Footer Text',
          description: 'Main text displayed in the footer',
          rows: 3,
        }),
        defineField({
          name: 'copyrightText',
          type: 'string',
          title: 'Copyright Text',
          description: 'e.g., "© 2024 Lydia Lockhart. All rights reserved."',
        }),
        defineField({
          name: 'socialLinks',
          type: 'array',
          title: 'Social Media Links',
          description: 'Links to your social media profiles',
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
                      {title: 'Twitter/X', value: 'twitter'},
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
                  validation: (Rule) => Rule.required(),
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
          name: 'additionalLinks',
          type: 'array',
          title: 'Additional Footer Links',
          description: 'Extra links like Privacy Policy, Terms of Service, etc.',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                  title: 'URL',
                  description: 'Use "/" for home, "#section-id" for anchor links, or full URLs',
                  validation: (Rule) => Rule.required(),
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

    // Visual Settings
    defineField({
      name: 'testimonialsBackgroundImage',
      type: 'image',
      title: 'Testimonials Background Image',
      description: 'Optional background image for the testimonials section (will be blended)',
      fieldset: 'visual',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactBackgroundImage',
      type: 'image',
      title: 'Contact Form Background Image',
      description: 'Optional background image for the contact form section (will be blended)',
      fieldset: 'visual',
      options: {
        hotspot: true,
      },
    }),
  ],
})

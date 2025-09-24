import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Navigation Title',
      description: 'Internal reference name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'menuItems',
      type: 'array',
      title: 'Menu Items',
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
              name: 'isActive',
              type: 'boolean',
              title: 'Show in Navigation',
              initialValue: true,
            }),
            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Open in New Tab',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
              isActive: 'isActive',
            },
            prepare({title, subtitle, isActive}) {
              return {
                title,
                subtitle: `${subtitle} ${!isActive ? '(Hidden)' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'CTA Button',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
        }),
        defineField({
          name: 'url',
          type: 'string',
          title: 'Button URL',
          description: 'Use "#contact" for anchor links or full URLs',
          placeholder: '#contact',
        }),
        defineField({
          name: 'isVisible',
          type: 'boolean',
          title: 'Show CTA Button',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'showBlogLink',
      type: 'boolean',
      title: 'Show Blog in Navigation',
      description: 'Toggle to show/hide Blog link in navigation bar',
      initialValue: false,
    }),
    defineField({
      name: 'showFaqLink',
      type: 'boolean',
      title: 'Show FAQ in Navigation',
      description: 'Toggle to show/hide FAQ link in navigation bar',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

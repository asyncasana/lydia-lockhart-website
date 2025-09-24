import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'Brief description shown on the main services section',
    }),
    defineField({
      name: 'fullContent',
      type: 'array',
      title: 'Full Content',
      description: 'Detailed content for the service page',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Icon/Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      title: 'CTA Button (Optional)',
      description: 'Call-to-action button for this service',
      fields: [
        defineField({
          name: 'text',
          type: 'string',
          title: 'Button Text',
          initialValue: 'Get Started',
        }),
        defineField({
          name: 'link',
          type: 'string',
          title: 'Button Link (Optional)',
          description:
            'External URL (https://example.com) or internal path (#contact, /services, etc.). Leave empty to use contact section.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'icon',
    },
  },
})

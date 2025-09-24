import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    // Main about section (for backward compatibility)
    defineField({name: 'bio', type: 'text', title: 'Main Bio'}),
    defineField({name: 'image', type: 'image', title: 'Main Profile Image'}),
    defineField({name: 'highlight', type: 'string', title: 'Main Highlight/Quote'}),
    
    // Carousel sections
    defineField({
      name: 'carouselSections',
      title: 'About Carousel Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Section Title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Section Image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'shortDescription',
              type: 'text',
              title: 'Short Description (for carousel)',
              description: 'Brief text shown in the carousel',
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: 'slug',
              type: 'slug',
              title: 'Slug',
              description: 'URL-friendly identifier for this section',
              options: {
                source: 'title',
                maxLength: 50,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'longDescription',
              type: 'array',
              title: 'Detailed Content',
              of: [
                {
                  type: 'block',
                },
              ],
            }),
            defineField({
              name: 'ctaButton',
              type: 'object',
              title: 'Call-to-Action Button',
              fields: [
                defineField({
                  name: 'isVisible',
                  type: 'boolean',
                  title: 'Show CTA Button',
                  initialValue: false,
                }),
                defineField({
                  name: 'text',
                  type: 'string',
                  title: 'Button Text',
                }),
                defineField({
                  name: 'url',
                  type: 'url',
                  title: 'Button URL',
                  description: 'External URL or internal path (e.g., /contact)',
                }),
                defineField({
                  name: 'isExternal',
                  type: 'boolean',
                  title: 'Is External Link',
                  description: 'Opens in new tab if external',
                  initialValue: false,
                }),
              ],
              hidden: ({parent}: {parent: any}) => !parent?.ctaButton?.isVisible,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'shortDescription',
              media: 'image',
            },
          },
        },
      ],
      options: {
        sortable: true, // This makes sections draggable/reorderable
      },
    }),
  ],
})

import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({name: 'headline', type: 'string', title: 'Headline'}),
    defineField({name: 'subheadline', type: 'string', title: 'Subheadline'}),
    defineField({
      name: 'backgroundMedia',
      type: 'object',
      title: 'Background Media',
      fields: [
        defineField({
          name: 'mediaType',
          type: 'string',
          title: 'Media Type',
          options: {
            list: [
              {title: 'Video', value: 'video'},
              {title: 'Image', value: 'image'},
            ],
          },
        }),
        defineField({
          name: 'videoUrl',
          type: 'url',
          title: 'Video URL',
          hidden: ({parent}) => parent?.mediaType !== 'video',
        }),
        defineField({
          name: 'image',
          type: 'image',
          title: 'Background Image',
          options: {
            hotspot: true,
          },
          hidden: ({parent}) => parent?.mediaType !== 'image',
        }),
      ],
    }),
    defineField({name: 'ctaText', type: 'string', title: 'CTA Text'}),
    defineField({name: 'ctaUrl', type: 'url', title: 'CTA URL'}),
  ],
})

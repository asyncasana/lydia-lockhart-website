import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'array',
      title: 'Answer',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Services', value: 'services'},
          {title: 'Pricing', value: 'pricing'},
          {title: 'Process', value: 'process'},
        ],
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Used to sort FAQs within categories',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      description: 'Show this FAQ on the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Category and Order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      isActive: 'isActive',
    },
    prepare({title, category, isActive}) {
      return {
        title,
        subtitle: `${category || 'Uncategorized'} ${!isActive ? '(Inactive)' : ''}`,
      }
    },
  },
})

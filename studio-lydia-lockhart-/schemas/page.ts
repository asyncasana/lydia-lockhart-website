import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Static Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The title that will appear at the top of the page and in the browser tab',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Page URL',
      description: 'This will be the URL path (e.g., "privacy-policy" becomes /privacy-policy)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Page Content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
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
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
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
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'Brief description for search engines (150-160 characters recommended)',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'isPublished',
      type: 'boolean',
      title: 'Published',
      description: 'Only published pages will be visible on the website',
      initialValue: true,
    }),
    defineField({
      name: 'showInFooter',
      type: 'boolean',
      title: 'Show in Footer',
      description: 'Display this page as a link in the footer',
      initialValue: false,
    }),
    defineField({
      name: 'footerOrder',
      type: 'number',
      title: 'Footer Display Order',
      description: 'Order in which this page appears in the footer (lower numbers first)',
      hidden: ({document}) => !document?.showInFooter,
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isPublished: 'isPublished',
      showInFooter: 'showInFooter',
    },
    prepare({title, slug, isPublished, showInFooter}) {
      const status = []
      if (!isPublished) status.push('Draft')
      if (showInFooter) status.push('In Footer')

      return {
        title,
        subtitle: `/${slug}${status.length > 0 ? ` • ${status.join(' • ')}` : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Footer Order',
      name: 'footerOrder',
      by: [{field: 'footerOrder', direction: 'asc'}],
    },
  ],
})

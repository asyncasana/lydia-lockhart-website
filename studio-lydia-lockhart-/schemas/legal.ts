import {defineField, defineType} from 'sanity'

export const legal = defineType({
  name: 'legal',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}}),
    defineField({name: 'content', type: 'array', title: 'Content', of: [{type: 'block'}]}),
  ],
})

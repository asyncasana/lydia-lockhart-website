import {defineField, defineType} from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'description', type: 'text', title: 'Description'}),
    defineField({name: 'url', type: 'url', title: 'URL'}),
    defineField({name: 'image', type: 'image', title: 'Image'}),
  ],
})

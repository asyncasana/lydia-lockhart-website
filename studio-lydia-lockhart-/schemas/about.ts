import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({name: 'bio', type: 'text', title: 'Bio'}),
    defineField({name: 'image', type: 'image', title: 'Profile Image'}),
    defineField({name: 'highlight', type: 'string', title: 'Highlight/Quote'}),
  ],
})

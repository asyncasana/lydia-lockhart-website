import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', title: 'Name'}),
    defineField({name: 'text', type: 'text', title: 'Testimonial'}),
    defineField({name: 'role', type: 'string', title: 'Role/Title'}),
  ],
})

import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role/Title',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Photo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'shortText',
      type: 'text',
      title: 'Short Testimonial (Summary)',
      description: 'Brief version shown in carousel - max 150 characters',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'fullText',
      type: 'text',
      title: 'Full Testimonial',
      description: 'Complete testimonial shown when expanded',
    }),
    // Keep legacy field for backward compatibility
    defineField({
      name: 'text',
      type: 'text',
      title: 'Legacy Testimonial (Deprecated)',
      description: 'Old field - use shortText and fullText instead',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortText',
      media: 'image',
    },
  },
})

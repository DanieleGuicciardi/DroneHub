import { defineField, defineType } from 'sanity'

export const droneProductType = defineType({
  name: 'CineDrones',
  title: 'CineDrones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(1).precision(2),
    }),
    defineField({
      name: 'image1',
      title: 'Image 1',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image2',
      title: 'Image 2',
      type: 'image',
    }),
    defineField({
      name: 'image3',
      title: 'Image 3',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Spec',
      type: 'text',
      description: 'Add one specification per line using Enter.',
    }),
    defineField({
      name: 'flyMoreComboPrice',
      title: 'Fly More Combo Price',
      type: 'number',
      description: 'Leave 0 if not avaible',
      initialValue: 0
    }),    
    defineField({
      name: 'stock',
      title: 'stock',
      type: 'number',
    })
  ],
})

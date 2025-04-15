import { defineField, defineType } from 'sanity'

export const secondaryproducts = defineType({
  name: 'SecondaryProducts',
  title: 'Secondary Products',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price (€)',
      type: 'number',
      validation: (rule) => rule.required().min(1).precision(2),
    }),

    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'text',
      description: 'Add one specification per line using Enter.',
    }),

    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['ActionCam', 'RemoteController', 'Stabilizers', 'Accessory'],
        layout: 'radio',
      },
    }),
  ],
})

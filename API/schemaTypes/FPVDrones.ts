import { defineField, defineType } from 'sanity'

export const fpvDroneType = defineType({
  name: 'FPVDrones',
  title: 'FPV Drones',
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
      name: 'configurations',
      title: 'Available Configurations',
      type: 'array',
      of: [
        defineField({
          name: 'configuration',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Option Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price (€)',
              type: 'number',
              validation: (rule) => rule.required().min(1).precision(2),
            }),
            defineField({
              name: 'previewImage',
              title: 'Preview Image',
              type: 'image',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
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
      description: 'Add one spec per line',
    }),

    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Mini', 'Freestyle', 'LongRange', 'Race'],
        layout: 'radio',
      },
    }),

  ],
})
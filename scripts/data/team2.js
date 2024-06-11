
import {defineField, defineType} from 'sanity'

const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'imgSrc',
      title: 'Image Source',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Category Name',
                  type: 'string',
                }),
                defineField({
                  name: 'list',
                  title: 'Client List',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'methods',
          title: 'Contact Methods',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Method Name',
                  type: 'string',
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'url',
                }),
                defineField({
                  name: 'display',
                  title: 'Display Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'imgSrc',
    },
  },
})

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [{type: 'reference', to: {type: 'teamMember'}}],
    }),
  ],
})
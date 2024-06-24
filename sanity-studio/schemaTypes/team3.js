// schemas/team.js
import { defineField, defineType } from 'sanity'
import teamMember from '../../scripts/data/teamMember'

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'teamMember' } }],
    }),
  ],
})

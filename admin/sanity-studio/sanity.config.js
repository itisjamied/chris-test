import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
// import {deskTool} from 'sanity/desk'
// import sanityClient from '@sanity/client';

export default defineConfig({
  name: 'default',
  title: 'valueform2',
  basePath: '/admin',

  projectId: 'wfwxz1rq',
  dataset: 'production',

  apiVersion: '2024-06-27',

  plugins: [structureTool(), visionTool(),],

  schema: {
    types: schemaTypes,
  },
})

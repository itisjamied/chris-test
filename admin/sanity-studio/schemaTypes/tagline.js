import { defineField, defineType } from "sanity";

export default defineType({
  name: "tagline",
  title: "Tagline",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Tagline Text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
  },
});

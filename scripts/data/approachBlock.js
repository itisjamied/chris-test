
import { defineField, defineType } from "sanity";

export default defineType({
  name: "complexIntroBlock",
  title: "Complex Intro Block",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
    }),
    defineField({
      name: "underlineText",
      title: "Underline Text",
      type: "string",
      description: "This should be a segment from the body text",
    }),
    defineField({
      name: "popUpImage",
      title: "Pop Up Image",
      type: "string",
    }),
    defineField({
      name: "boldText",
      title: "Bold Text",
      type: "string",
      description: "This should be part of the body text",
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [
        defineField({
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "popUpImage",
    },
  },
});

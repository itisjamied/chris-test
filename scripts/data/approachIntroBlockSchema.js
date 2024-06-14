import { defineField, defineType } from "sanity";

export default defineType({
  name: "approachIntroBlock",
  title: "Approach Intro Block",
  type: "document",
  fields: [
    defineField({
      name: "paragraph",
      title: "Intro Paragraph",
      type: "text",
    }),
    defineField({
      name: "lottieSrc",
      title: "Intro Graphic",
      type: "url",
    }),
    defineField({
      name: "lottieSpeed",
      title: "Lottie Speed",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "paragraph",
      media: "lottieSrc",
    },
  },
});

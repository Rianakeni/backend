export default () => ({
  "strapi-plugin-pdf-creator": {
    enabled: true,
    config: {
      beautifyDate: {
        fields: ["tanggal"], // name of fields that will be changed
        options: {
          // check JS toLocaleDateString options for details
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      },
    },
  },
});

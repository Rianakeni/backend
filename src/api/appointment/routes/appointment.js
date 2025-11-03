module.exports = {
  routes: [
    {
      method: "POST",
      path: "/appointments",
      handler: "appointment.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/appointments/:id",
      handler: "appointment.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    // Jika kamu punya route lain, tambahkan sesuai kebutuhan
  ],
};

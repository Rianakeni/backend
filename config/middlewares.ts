export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "http://localhost:3000", // Development frontend
        "http://localhost:3001", // Alternative development port
        process.env.FRONTEND_URL || "http://localhost:3000", // Production frontend URL dari env variable
        // Tambahkan production URL jika ada
        "https://better-u-web-application.vercel.app",
      ],
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "X-Requested-With",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      credentials: true, // Mengizinkan cookies dan credentials
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

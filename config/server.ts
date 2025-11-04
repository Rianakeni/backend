export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  // CORS configuration untuk mengizinkan request dari frontend
  cors: {
    enabled: true,
    origin: [
      "http://localhost:3000", // Development frontend
      "http://localhost:3001", // Alternative development port
      env("FRONTEND_URL", "http://localhost:3000"), // Production frontend URL dari env variable
      // Tambahkan production URL jika ada
      // 'https://your-production-domain.com',
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
});

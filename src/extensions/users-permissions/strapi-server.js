// path: src/extensions/users-permissions/strapi-server.js

module.exports = (plugin) => {
  // Tambahkan console.log ini untuk debugging.
  // Anda akan melihat pesan ini di terminal Strapi saat server di-restart.
  console.log("✅ Custom users-permissions/strapi-server.js is loaded.");

  // Override controller 'auth'
  plugin.controllers.auth.register = async (ctx) => {
    const pluginStore = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
    });

    const settings = await pluginStore.get({
      key: "advanced",
    });

    if (!settings.allow_register) {
      return ctx.badRequest(null, "Register action is currently disabled.");
    }

    // Ambil 'phonenumber' dari body request
    const { username, email, password, phonenumber } = ctx.request.body;

    // Validasi dasar di backend
    if (!username) return ctx.badRequest(null, "Missing username");
    if (!email) return ctx.badRequest(null, "Missing email");
    if (!password) return ctx.badRequest(null, "Missing password");
    if (!phonenumber) return ctx.badRequest(null, "Missing phonenumber"); // Validasi phonenumber

    const userWithSameUsername = await strapi
      .query("plugin::users-permissions.user")
      .findOne({ where: { username } });

    if (userWithSameUsername) {
      return ctx.badRequest(null, "Username already taken.");
    }

    const userWithSameEmail = await strapi
      .query("plugin::users-permissions.user")
      .findOne({ where: { email: email.toLowerCase() } });

    if (userWithSameEmail) {
      return ctx.badRequest(null, "Email already taken.");
    }

    const hashedPassword = await strapi
      .service("plugin::users-permissions.user")
      .hashPassword({ password });

    const role = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: settings.default_role } });

    // Buat user baru dengan menyertakan phonenumber
    const newUser = {
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role.id,
      provider: "local",
      confirmed: !settings.email_confirmation,
      blocked: false,
      phonenumber: phonenumber, // Ini adalah field kustom Anda
    };

    try {
      const user = await strapi
        .service("plugin::users-permissions.user")
        .add(newUser);

      return ctx.send(
        {
          jwt: strapi
            .service("plugin::users-permissions.jwt")
            .issue({ id: user.id }),
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
          },
        },
        200
      );
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, "An error occurred during registration.");
    }
  };

  return plugin;
};

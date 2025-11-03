"use strict";

const { ApplicationError } = require("@strapi/utils").errors;

/**
 * Lifecycle hook to restrict user registration to a specific email domain.
 * This runs on user creation (including registration via the users-permissions plugin).
 */
module.exports = {
  async beforeCreate(event) {
    const { params } = event;
    const { data } = params;

    if (!data) return;

    const email = (data.email || "").toString().toLowerCase();
    const allowedDomain = "@student.unklab.ac.id";

    if (!email.endsWith(allowedDomain)) {
      throw new ApplicationError(
        `Registrations are limited to email addresses ending with '${allowedDomain}'.`
      );
    }
  },
};

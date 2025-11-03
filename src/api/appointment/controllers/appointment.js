"use strict";

const { parseMultipartData, sanitizeEntity } = require("@strapi/utils");

module.exports = {
  /**
   * Create a record.
   */
  create: async (ctx) => {
    const { data } = ctx.request.body;

    // Jika `schedule` berisi `slug`, cari ID-nya
    if (
      data.schedule &&
      typeof data.schedule === "object" &&
      data.schedule.slug
    ) {
      const schedule = await strapi.db.query("api::schedule.schedule").findOne({
        where: { slug: data.schedule.slug },
        select: ["id"],
      });

      if (!schedule) {
        return ctx.badRequest("Schedule not found with the provided slug.");
      }

      // Ganti `schedule` dengan ID-nya
      data.schedule = schedule.id;
    }

    // Gunakan controller default Strapi untuk create
    const entity = await strapi.entityService.create(
      "api::appointment.appointment",
      {
        data,
      }
    );

    // Sanitasi output agar aman
    const sanitizedEntity = sanitizeEntity(entity, {
      model: strapi.getModel("api::appointment.appointment"),
    });

    ctx.body = { data: sanitizedEntity };
  },

  /**
   * Update a record.
   */
  update: async (ctx) => {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    // Jika `schedule` berisi `slug`, cari ID-nya
    if (
      data.schedule &&
      typeof data.schedule === "object" &&
      data.schedule.slug
    ) {
      const schedule = await strapi.db.query("api::schedule.schedule").findOne({
        where: { slug: data.schedule.slug },
        select: ["id"],
      });

      if (!schedule) {
        return ctx.badRequest("Schedule not found with the provided slug.");
      }

      // Ganti `schedule` dengan ID-nya
      data.schedule = schedule.id;
    }

    // Gunakan controller default Strapi untuk update
    const entity = await strapi.entityService.update(
      "api::appointment.appointment",
      id,
      {
        data,
      }
    );

    // Sanitasi output agar aman
    const sanitizedEntity = sanitizeEntity(entity, {
      model: strapi.getModel("api::appointment.appointment"),
    });

    ctx.body = { data: sanitizedEntity };
  },
};

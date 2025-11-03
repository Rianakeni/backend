module.exports = {
  lifecycles: {
    async afterCreate(event) {
      const { result } = event;

      // Pastikan field `schedule` ada dan terisi
      if (result.schedule && result.schedule.id) {
        const scheduleId = result.schedule.id;

        try {
          // Update Schedule: ubah isBooked menjadi true
          await strapi.entityService.update(
            "api::schedule.schedule",
            scheduleId,
            {
              data: {
                isBooked: true,
              },
            }
          );
        } catch (error) {
          console.error("Gagal update Schedule.isBooked:", error);
        }
      }
    },

    async afterDelete(event) {
      const { result } = event;

      // Jika appointment dihapus, kembalikan isBooked menjadi false
      if (result.schedule && result.schedule.id) {
        const scheduleId = result.schedule.id;

        try {
          await strapi.entityService.update(
            "api::schedule.schedule",
            scheduleId,
            {
              data: {
                isBooked: false,
              },
            }
          );
        } catch (error) {
          console.error(
            "Gagal reset Schedule.isBooked saat appointment dihapus:",
            error
          );
        }
      }
    },

    async afterUpdate(event) {
      const { result, params } = event;

      // Jika status diubah menjadi 'cancelled'
      if (
        params.data.statusJadwal === "cancelled" &&
        result.statusJadwal !== "cancelled"
      ) {
        if (result.schedule && result.schedule.id) {
          const scheduleId = result.schedule.id;

          try {
            await strapi.entityService.update(
              "api::schedule.schedule",
              scheduleId,
              {
                data: {
                  isBooked: false, // Kembalikan jadwal ke belum dibooking
                },
              }
            );
          } catch (error) {
            console.error(
              "Gagal reset Schedule.isBooked saat appointment dibatalkan:",
              error
            );
          }
        }
      }
    },
  },
};

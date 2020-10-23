const migrateUtil = require('../migrate-util');

module.exports = {
  /**
   * sets autoReveal "true" on all rooms
   */
  async up(db) {
    const ops = [];

    await db
      .collection('rooms')
      .find({})
      .forEach((room) => {
        room.autoReveal = true;
        migrateUtil.toBulkOps(ops, room);
      });

    if (ops.length) {
      return db.collection('rooms').bulkWrite(ops);
    }
  },

  /**
   * removes autoReveal flag on every room
   */
  async down(db) {
    const ops = [];

    await db
      .collection('rooms')
      .find({})
      .forEach((room) => {
        delete room.autoReveal;
        migrateUtil.toBulkOps(ops, room);
      });

    if (ops.length) {
      return db.collection('rooms').bulkWrite(ops);
    }
  }
};

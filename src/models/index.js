const sequelize = require("../config/database");
const Note = require("./notes");
const User=require("./users");

const syncDB = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = {sequelize, syncDB, Note,User};

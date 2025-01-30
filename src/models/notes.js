const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users");

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  userId:{
    type:DataTypes.UUID,
    allowNull:false,
    references:{
      model:"users",
      key:"id",
    },
    onDelete: "CASCADE",
    
  },
}, {
  tableName: "notes",
  timestamps: true,
});



User.hasMany(Note, { foreignKey: "userId", as: "notes" });
Note.belongsTo(User, { foreignKey: "userId", as: "users" });

module.exports = Note;
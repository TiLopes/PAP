const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "email_UNIQUE",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "groups",
          key: "id",
        },
      },
      authToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "authToken_UNIQUE",
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "email_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
        {
          name: "authToken_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "authToken" }],
        },
        {
          name: "group_FK_idx",
          using: "BTREE",
          fields: [{ name: "group_id" }],
        },
      ],
    }
  );
  user.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.getDataValue("password"), salt);
    user.setDataValue("password", hash);
  });

  user.login = async function (email, password) {
    if (!email) {
      throw new Error("Email vazio");
    }

    if (!password) {
      throw new Error("Password vazia");
    }

    const usr = await user.findOne({ where: { email: email } });

    if (!usr) {
      throw new Error("Esse email nao esta registado");
    }

    const auth = bcrypt.compareSync(password, usr.password);
    if (auth) {
      return usr;
    }
    throw new Error("Password errada");
  };

  user.saveToken = async (id, token) => {
    await user.update({ authToken: token }, { where: { id: id } });
  };

  user.removeToken = async (user, token) => {
    await user.update({ authToken: null }, { where: { id: user.id } });
    console.log("Apagado com sucesso");
  };

  return user;
};

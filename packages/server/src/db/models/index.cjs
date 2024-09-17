"use strict";

const path = require("node:path");
const fs = require("node:fs");
const { Sequelize } = require("sequelize");

const mode = process.env.NODE_ENV || "development";
const config = require(path.resolve("config/db.json"))[mode];
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(
      config.database,
      config.username,
      config.password,
      config,
    );

const basename = path.basename(__filename);
const db = Object.fromEntries(
  fs
    .readdirSync(__dirname)
    .filter((file) => {
      const { base, ext } = path.parse(file);

      return (
        base[0] != "." &&
        base != basename &&
        !base.includes(".test") &&
        ext.includes("js")
      );
    })
    .map((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes,
      );

      return [model.name, model];
    }),
);

Object.values(db).forEach((model) => {
  model.associate?.(db);
});

Object.assign(db, { sequelize, Sequelize });

module.exports = db;

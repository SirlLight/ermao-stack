import Sequelize from "sequelize";
import configs from "./db.json";

const dbConfig = configs.mysql,
    dbHost = dbConfig.host,
    dbPort = dbConfig.port,
    dbUserName = dbConfig.username,
    dbPwd = dbConfig.password,
    dbName = dbConfig.dbName;

const database = {
    sequelize: new Sequelize(dbName, dbUserName, dbPwd, {
        host: dbHost,
        dialect: "mysql",
        port: dbPort,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            freezeTableName: true,  // Model对应的表名将与model名相同
        }
    })
};

database.User = database.sequelize.import("../models/user.js");

export default database;
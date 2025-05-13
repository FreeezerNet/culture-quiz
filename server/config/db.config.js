module.exports = {
    hostname: "localhost",
    user: "root",
    password: "",
    database: "sequelize_tp",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
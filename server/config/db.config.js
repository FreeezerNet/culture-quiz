module.exports = {
    hostname: "localhost",
    user: "root",
    password: "root",
    database: "sequelize_tp",
    dialect: "mysql",
    port: 8889,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

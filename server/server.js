const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

let corsOptions = {
    origin:"http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

const swaggerSpec = swaggerJsdoc({
    swaggerDefinition: {
        openapi: "3.0.2",
        info: {
            title: "TP EXPRESS JWT",
            version: "1.0.0",
            description: "API documentation",
            servers: [`http://localhost:${process.env.PORT || 3000}/`],
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                },
            }
        },
        security: [{
            jwt: []
        }],
    },
    apis: ["server.js", "./routes/*.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.json({message:"Bienvenue dans l'application TP 10: Jetons JWT"});
});

//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur écoute sur le port ${PORT}`);
});

const db = require("./models");
db.sequelize.sync().then(() => {
    console.log('Database synchronized successfully');
});
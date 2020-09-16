require('dotenv').config();
module.exports = {
    production: {
        client: process.env.DB_TYPE,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            charset: process.env.DB_CHARSET,
            debug: eval(process.env.DB_DEBUG)
        }
    },
};

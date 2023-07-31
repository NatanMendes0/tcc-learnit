const mongoose = require('mongoose');
require("dotenv").config();

// Connect to MongoDB
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
     mongoose.connect(process.env.DB, connectionParams)
     console.log('Conectado ao banco de dados!')   
    } catch (error) {
        console.log(error);
        console.log("Não foi possível conectar ao banco de dados...");
    }
}
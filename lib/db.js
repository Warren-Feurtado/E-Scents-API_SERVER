const mongoose = require('mongoose');
// require('dotenv/config');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then((x) => {
    console.log(`Successfully connected to "${x.connections[0].name}" Database in MongoDB`);
})
.catch((err) => {
    console.error(`Error connecting to MongoDB`, err);
});

module.exports = mongoose;
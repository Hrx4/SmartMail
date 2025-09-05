
const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    userEmail :{
        type : String,
        require: true,
    },
    queryText : {
        type : String,
        require: true,
    },
    embeddings : {
        type: Array,
        require: true,
    }
})

module.exports = mongoose.model("Query", querySchema);
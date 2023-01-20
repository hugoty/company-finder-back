mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  postalCode: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("City", CitySchema);
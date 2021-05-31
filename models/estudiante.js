const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlumnoSchema = new Schema({
    nombre: String,
    contacto: String,
    comentario: String,
});
module.exports=mongoose.model('alumnos', AlumnoSchema);


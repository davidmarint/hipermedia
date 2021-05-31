const express=require('express')
const app=express()
const fs=require("fs")

//habilitamos el controlador de rutas
const router = express.Router;
var mongoose= require('mongoose');
//importar rutas
const indexRoutes = require('./routes/index');

app.set('port', process.env.PORT | 3001)
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get('/web' , (req, res) => {
    res.render("index")
})
app.get('/table/:nom', async (req, res) => {
    const { nom } = req.params;
    data = [];
    await fs.unlink('public/lios.txt', function (err) {
        if (err && err.code == 'ENOENT') {
            
            console.info("File doesn't exist, won't remove it.");
            almacenarTabla(res, nom, data);
        } else if (err) {
           
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`removed`);
            almacenarTabla(res, nom, data);
        }
    });
})


app.set('views',__dirname + '/views');
app.set ('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//para mapear el indexRoutes
app.use('/',indexRoutes);

/*async function almacenarTabla(res, nom, data) {
    await fs.writeFileSync('public/lios.txt', `Tabla\nLa base usada es: ${nom}` + '\n', { flag: 'a' }, (err) => { })
    for (var i = 1; i <= 10; i++) {
        data[i - 1] = `${nom} * ${i} = ${nom * i}`;
        await fs.writeFileSync('public/lios.txt', data[i - 1] + '\n', { flag: 'a' }, (err) => { })

    }
    console.log(data)
    res.json( data );
}

app.get('/table', (req, res) => {
    fs.readFile('public/lios.txt', 'utf8', (err, data) => {
        if (err) return console.log(err);
        if (data) return res.json(data.split('\n'));
    })
})*/

  // para ingresar la configuracion del mongoose para poder ejecutar promesas
  mongoose.Promise = global.Promise;
  //para configurar el callback y conectar la base de datos 
mongoose.connect("mongodb+srv://leandro:123456q@cluster0.luirh.mongodb.net/test?authSource=admin&replicaSet=atlas-dv49dk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
console.log( 'la conexion a moongoAtlas se hizo correctamente');

//configuracion para poder entender los datos 
app.use(express.urlencoded({extended:false}));

// para implementar el ejs para usasr el motor de plantillas
app.set('views',__dirname + '/views');
app.set('views engine','ejs');

app.listen(app.get('port'), () => {
    console.log(`servidor corriendo http://localhost:${app.get('port')}`)
  });
});


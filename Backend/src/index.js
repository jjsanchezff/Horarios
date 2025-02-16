import { app } from "./app/app.js";

// settings
app.set('port', process.env.PORT || 3000);


// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('🚀 Server corriendo en el puerto', app.get('port'), "🚀")
}).on('error', (error) => {
    console.error('Error al iniciar el servidor:', error.message)
});

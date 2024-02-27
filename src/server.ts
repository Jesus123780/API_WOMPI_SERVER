import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
// import wompi from '@wompi/api';

// Crear una instancia de Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes entrantes como JSON
app.use(bodyParser.json());

// Ruta de prueba para verificar que la API está funcionando
app.get('/', (req: Request, res: Response) => {
  res.send('¡API de prueba funcionando!');
});

// Ruta para procesar pagos utilizando la API de Wompi
app.post('/pagos', async (req: Request, res: Response) => {
  try {
    // Aquí procesaremos el pago utilizando la API de Wompi
    // Reemplaza este código con la lógica real para procesar el pago

    // Por ahora, solo devolvemos un mensaje de éxito
    res.json({ message: 'Pago procesado exitosamente' });
  } catch (error) {
    // Si ocurre algún error, devolvemos un mensaje de error
    res.status(500).json({ error: 'Ocurrió un error al procesar el pago' });
  }
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import uploadRoutes from './routes/uploadRoutes';
import dotenv from 'dotenv';
import storesRoutes from './routes/storesRoutes';

const app = Fastify({ logger: true });
dotenv.config();

app.register(fastifyCors);
app.register(fastifyMultipart);
app.register(uploadRoutes);
app.register(storesRoutes);

const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 4000,
      host: '0.0.0.0',
    });
    console.log('🚀 Server running...');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

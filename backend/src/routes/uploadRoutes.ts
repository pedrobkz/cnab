import { FastifyInstance } from 'fastify';
import { handleUpload } from '../controllers/uploadController';

export default async function (app: FastifyInstance) {
  app.post('/upload-file', handleUpload);
}

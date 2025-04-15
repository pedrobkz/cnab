import { FastifyRequest, FastifyReply } from 'fastify';
import * as uploadServices from '../services/uploadServices';

export const handleUpload = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = await request.file();
  if (!data) return reply.status(400).send({ error: 'Arquivo não enviado' });

  let fileContent = '';
  for await (const chunk of data.file) {
    fileContent += chunk;
  }

  await uploadServices.importTransactionsFromCnab(fileContent);

  reply.send({ message: 'Arquivo processado com sucesso!' });
};

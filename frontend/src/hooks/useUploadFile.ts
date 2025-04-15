import { useState } from 'react';
import { useToast } from './useToast';
import axios from 'axios';

const useUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);
  const toast = useToast();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:4000/upload-file',
        formData
      );
      if (response.data) {
        toast('Arquivo enviado com sucesso!', 'success');
        setUploadComplete(true);
      }
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
    }
  };

  return {
    handleUpload,
    handleSubmit,
    fileName,
    file,
    uploadComplete,
    setUploadComplete,
  };
};

export default useUploadFile;

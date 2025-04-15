import style from './Modal.module.css';
// import { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  fileName: string;
};

const Modal = ({
  isOpen = false,
  onClose,
  onUpload,
  onSubmit,
  fileName,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <button className={style.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={style.title}>Upload do Arquivo CNAB</h2>

        <div className={style.content}>
          <div className={style.uploadContainer}>
            <div className={style.uploadBox}>
              <label htmlFor='file-upload' className={style.uploadLabel}>
                {fileName ? fileName : 'Escolher Arquivo'}
              </label>
              <input
                id='file-upload'
                type='file'
                accept='.txt'
                onChange={(e) => onUpload(e)}
                className={style.uploadInput}
              />

              <button
                disabled={!fileName}
                onClick={() => onSubmit()}
                className='button'
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

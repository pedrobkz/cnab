import style from './PageHeader.module.css';
type PageHeaderProps = {
  onClick?: () => void;
};
const PageHeader = ({ onClick = () => {} }: PageHeaderProps) => {
  return (
    <div className={style.wrapper}>
      <div>
        <h1>Importação de CNAB</h1>
        <h4>
          Utilize o formulário abaixo para importar o arquivo CNAB ou acompanhe
          as operações.
        </h4>
      </div>

      <div>
        <button className='button' onClick={() => onClick()}>
          Upload de arquivo
        </button>
      </div>
    </div>
  );
};

export default PageHeader;

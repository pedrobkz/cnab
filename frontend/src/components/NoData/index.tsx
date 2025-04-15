import style from './NoData.module.css';

interface NoDataProps {
  onClick?: () => void;
}

const NoData = ({ onClick = () => {} }: NoDataProps) => {
  return (
    <div className={style.NoData}>
      <div className={style.wrapper}>
        <img
          src='https://cdn-icons-png.flaticon.com/512/17134/17134569.png'
          alt='Nenhum arquivo encontrado'
        />
        <span className={style.title}>Oops!</span>

        <span className={style.description}>
          Nenhum dado encontrado, que tal fazer o upload de um arquivo?
        </span>

        <button className='button' onClick={() => onClick()}>
          Upload de arquivo
        </button>
      </div>
    </div>
  );
};

export default NoData;

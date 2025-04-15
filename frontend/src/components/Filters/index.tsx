import { useState } from 'react';
import style from './Filters.module.css';

interface FiltersProps {
  onSearch: (search: string) => void;
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

const Filters = ({ onSortChange, onSearch }: FiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const clearFilters = () => {
    setSearchQuery('');
    setSortOrder('asc');
    onSearch('');
    onSortChange('asc');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.filters}>
        <input
          type='text'
          placeholder='Procure por loja'
          value={searchQuery}
          onChange={(e) => {
            onSearch(e.target.value);
            setSearchQuery(e.target.value);
          }}
          className={style.input}
        />

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as 'asc' | 'desc');
            onSortChange(e.target.value as 'asc' | 'desc');
          }}
          className={style.select}
        >
          <option value='asc'>A-Z</option>
          <option value='desc'>Z-A</option>
        </select>

        <button type='button' onClick={() => clearFilters()} className='button'>
          Limpar
        </button>
      </div>
    </div>
  );
};

export default Filters;

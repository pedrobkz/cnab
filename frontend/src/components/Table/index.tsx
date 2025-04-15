import React from 'react';
import style from './Table.module.css';
import clsx from 'clsx';

export interface GenericObject {
  [key: string]: string | number | React.ReactNode | undefined;
}

type TableProps = {
  headers: Array<{ key: string; label: string }>;
  body: GenericObject[];
  onClickRow?: (row: GenericObject | null) => void;
  expandedRowRender?: (row: GenericObject) => React.ReactNode;
  expandedRowKey?: string | number | null;
  additionStyle?: React.CSSProperties;
};

const Table = ({
  headers,
  body,
  onClickRow = () => {},
  expandedRowRender,
  expandedRowKey,
  additionStyle,
}: TableProps) => {
  const handleOnRowClick = (row: GenericObject) => {
    if (expandedRowKey === row.id) return onClickRow(null);
    return onClickRow(row);
  };

  const formatCell = (key: string, value: unknown) => {
    if (key !== 'value' && key !== 'totalTransactionsValue') {
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      }
      return null;
    }

    const numericValue = Number(value);

    return (
      <span
        style={{
          color: numericValue < 0 ? '#d3597a' : '#51a3a7',
          textTransform: 'capitalize',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {numericValue.toFixed(2)}
      </span>
    );
  };

  return (
    <div className={style.wrapper}>
      <table className={style.table} style={additionStyle}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIdx) => (
            <React.Fragment key={rowIdx}>
              <tr
                onClick={() => handleOnRowClick(row)}
                className={clsx(
                  style.bodyRow,
                  expandedRowKey === row.id && style['bodyRow--active']
                )}
              >
                {headers.map((header) => (
                  <td key={header.key}>
                    {formatCell(header.key, row[header.key])}
                  </td>
                ))}
              </tr>
              {expandedRowRender && expandedRowKey === row.id && (
                <tr>
                  <td className={style.expandedRow} colSpan={headers.length}>
                    {expandedRowRender(row)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

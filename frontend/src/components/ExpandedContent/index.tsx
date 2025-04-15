import Table, { GenericObject } from '../Table';

interface ExpandedContentProps {
  row: GenericObject;
  storeBalance: number;
  storeTransactions: GenericObject[];
}
const ExpandedContent = ({
  row,
  storeBalance,
  storeTransactions,
}: ExpandedContentProps) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Transações</span>
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'capitalize',
          }}
        >
          Saldo R$
          <span
            style={{
              color: storeBalance < 0 ? '#d3597a' : '#51a3a7',
              marginLeft: '4px',
            }}
          >
            {storeBalance.toFixed(2)}
          </span>
        </span>
      </div>
      <Table
        additionStyle={{ border: 'unset !important' }}
        headers={[
          { key: 'id', label: 'Id' },
          { key: 'type', label: 'Tipo' },
          { key: 'date', label: 'Data' },
          { key: 'value', label: 'Valor' },
          { key: 'document', label: 'Documento' },
          { key: 'card', label: 'Cartão' },
          { key: 'time', label: 'Hora' },
        ]}
        body={storeTransactions.filter((tx) => tx.storeId === row.id)}
      />
    </div>
  );
};

export default ExpandedContent;

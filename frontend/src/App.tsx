import Modal from './components/Modal';
import Table from './components/Table';
import PageHeader from './components/PageHeader';
import NoData from './components/NoData';
import ExpandedContent from './components/ExpandedContent';
import useStores from './hooks/useStores';
import useExpandedContent from './hooks/useExpandedContent';
import useUploadFile from './hooks/useUploadFile';
import { useState } from 'react';
import Filters from './components/Filters';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { stores, refetchStores } = useStores();
  const { handleExpand, storeTransactions, storeBalance, expandedStoreId } =
    useExpandedContent();
  const {
    handleUpload,
    handleSubmit,
    fileName,
    uploadComplete,
    setUploadComplete,
  } = useUploadFile();

  if (uploadComplete) {
    setShowModal(false);
    setUploadComplete(false);
    refetchStores();
  }

  if (!stores.length && !showModal) {
    return <NoData onClick={() => setShowModal(true)} />;
  }

  const filteredStores = stores
    .filter((store) => {
      return (
        !searchQuery ||
        store.owner
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        store.name?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) =>
      sortOrder === 'asc'
        ? (a.name || '').toString().localeCompare((b.name || '').toString())
        : (b.name || '').toString().localeCompare((a.name || '').toString())
    );

  return (
    <div className='wrapper'>
      <PageHeader onClick={() => setShowModal(true)} />

      <Filters
        onSearch={(search) => setSearchQuery(search)}
        onSortChange={(sortOrder) => setSortOrder(sortOrder)}
      />

      <Table
        headers={[
          { key: 'id', label: 'Id' },
          { key: 'name', label: 'Nome' },
          { key: 'owner', label: 'Proprietário' },
          { key: 'totalTransactionsValue', label: 'Saldo' },
        ]}
        body={filteredStores}
        onClickRow={async (row) => handleExpand(row)}
        expandedRowKey={expandedStoreId}
        expandedRowRender={(row) => (
          <ExpandedContent
            row={row}
            storeBalance={storeBalance}
            storeTransactions={storeTransactions}
          />
        )}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpload={handleUpload}
        onSubmit={handleSubmit}
        fileName={fileName}
      />
    </div>
  );
};

export default App;

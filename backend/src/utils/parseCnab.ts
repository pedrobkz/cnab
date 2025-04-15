type CnabRecord = {
  type: string;
  date: string;
  value: number;
  document: string;
  card: string;
  time: string;
  storeOwner: string;
  storeName: string;
};

export const parseCnab = (content: string): CnabRecord[] => {
  const lines = content.trim().split('\n');

  return lines.map((line) => {
    return {
      type: line.slice(0, 1),
      date: formatDate(line.slice(1, 9)),
      value: Number(line.slice(9, 19)) / 100,
      document: line.slice(19, 30),
      card: line.slice(30, 42),
      time: formatTime(line.slice(42, 48)),
      storeOwner: line.slice(48, 62).trim(),
      storeName: line.slice(62).trim(),
    };
  });
};

function formatDate(dateStr: string) {
  return `${dateStr.slice(6, 8)}/${dateStr.slice(4, 6)}/${dateStr.slice(0, 4)}`;
}

function formatTime(timeStr: string) {
  return `${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}:${timeStr.slice(4, 6)}`;
}
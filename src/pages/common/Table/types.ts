export interface ITableDataProps {
  file_name: string;
  predictions: string;
  score: string;
  'index number': string;
}

export interface TableSortProps {
  data: ITableDataProps[];
}

export interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

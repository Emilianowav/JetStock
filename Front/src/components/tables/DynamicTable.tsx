import React from "react";
import styles from "./DynamicTable.module.css";
import { FaSort } from "react-icons/fa6";

interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "action";
  sortable?: boolean;
}

interface RowData {
  [key: string]: string | number | boolean | undefined;
}

interface TableProps<T extends RowData> {
  columns: Column[];
  data: T[];
  onActionClick?: (actionKey: string, rowData: T) => void;
}
const DynamicTable = <T extends RowData>({ columns, data, onActionClick }: TableProps<T>) => {
  const renderCellValue = (value: string | number | boolean | undefined): React.ReactNode => {
    return value ?? "-";
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {columns.map((column) => (
              <th key={column.key} className={styles.th}>
                {column.label}
                {column.sortable && <button className={styles.sortButton}><FaSort /></button>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {columns.map((column) => (
                <td key={column.key} className={styles.td}>
                  {column.type === "action" && onActionClick ? (
                    <button
                      className={styles.actionButton}
                      onClick={() => onActionClick(column.key, row)}
                    >
                      {column.label}
                    </button>
                  ) : (
                    renderCellValue(row[column.key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

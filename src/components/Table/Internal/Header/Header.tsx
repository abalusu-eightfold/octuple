import React, { useContext, useMemo } from 'react';
import type { ColumnsType, CellType, ColumnGroupType } from '../OcTable.types';
import { HeaderProps } from './Header.types';
import HeaderRow from './HeaderRow';
import TableContext from '../Context/TableContext';

function parseHeaderRows<RecordType>(
    rootColumns: ColumnsType<RecordType>
): CellType<RecordType>[][] {
    const rows: CellType<RecordType>[][] = [];

    function fillRowCells(
        columns: ColumnsType<RecordType>,
        colIndex: number,
        rowIndex: number = 0
    ): number[] {
        // Init rows
        rows[rowIndex] = rows[rowIndex] || [];

        let currentColIndex = colIndex;
        const colSpans: number[] = columns.filter(Boolean).map((column) => {
            const cell: CellType<RecordType> = {
                key: column.key,
                classNames: column.classNames || '',
                children: column.title,
                column,
                colStart: currentColIndex,
            };

            let colSpan: number = 1;

            const subColumns = (column as ColumnGroupType<RecordType>).children;
            if (subColumns && subColumns.length > 0) {
                colSpan = fillRowCells(
                    subColumns,
                    currentColIndex,
                    rowIndex + 1
                ).reduce((total, count) => total + count, 0);
                cell.hasSubColumns = true;
            }

            if ('colSpan' in column) {
                ({ colSpan } = column);
            }

            if ('rowSpan' in column) {
                cell.rowSpan = column.rowSpan;
            }

            cell.colSpan = colSpan;
            cell.colEnd = cell.colStart + colSpan - 1;
            rows[rowIndex].push(cell);

            currentColIndex += colSpan;

            return colSpan;
        });

        return colSpans;
    }

    // Generate `rows` cell data
    fillRowCells(rootColumns, 0);

    // Handle `rowSpan`
    const rowCount = rows.length;
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        rows[rowIndex].forEach((cell) => {
            if (!('rowSpan' in cell) && !cell.hasSubColumns) {
                // eslint-disable-next-line no-param-reassign
                cell.rowSpan = rowCount - rowIndex;
            }
        });
    }

    return rows;
}

function Header<RecordType>({
    stickyOffsets,
    columns,
    flattenColumns,
    onHeaderRow,
}: HeaderProps<RecordType>): React.ReactElement {
    const { getComponent } = useContext(TableContext);
    const rows: CellType<RecordType>[][] = useMemo(
        () => parseHeaderRows(columns),
        [columns]
    );

    const WrapperComponent = getComponent(['header', 'wrapper'], 'thead');
    const trComponent = getComponent(['header', 'row'], 'tr');
    const thComponent = getComponent(['header', 'cell'], 'th');

    return (
        <WrapperComponent className={'table-thead'}>
            {rows.map((row, rowIndex) => {
                const rowNode = (
                    <HeaderRow
                        key={rowIndex}
                        flattenColumns={flattenColumns}
                        cells={row}
                        stickyOffsets={stickyOffsets}
                        rowComponent={trComponent}
                        cellComponent={thComponent}
                        onHeaderRow={onHeaderRow}
                        index={rowIndex}
                    />
                );

                return rowNode;
            })}
        </WrapperComponent>
    );
}

export default Header;

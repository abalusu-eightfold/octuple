import React, { useContext } from 'react';
import Cell from '../Cell';
import type { CellType } from '../OcTable.types';
import { RowProps } from './Header.types';
import TableContext from '../Context/TableContext';
import { getCellFixedInfo } from '../Utilities/fixUtil';
import { getColumnsKey } from '../Utilities/valueUtil';

function HeaderRow<RecordType>({
    cells,
    stickyOffsets,
    flattenColumns,
    rowComponent: RowComponent,
    cellComponent: CellComponent,
    onHeaderRow,
    index,
}: RowProps<RecordType>) {
    const { direction } = useContext(TableContext);

    let rowProps: React.HTMLAttributes<HTMLElement>;
    if (onHeaderRow) {
        rowProps = onHeaderRow(
            cells.map((cell) => cell.column),
            index
        );
    }

    const columnsKey = getColumnsKey(cells.map((cell) => cell.column));

    return (
        <RowComponent {...rowProps}>
            {cells.map((cell: CellType<RecordType>, cellIndex) => {
                const { column } = cell;
                const fixedInfo = getCellFixedInfo(
                    cell.colStart,
                    cell.colEnd,
                    flattenColumns,
                    stickyOffsets,
                    direction
                );

                let additionalProps: React.HTMLAttributes<HTMLElement>;
                if (column && column.onHeaderCell) {
                    additionalProps = cell.column.onHeaderCell(column);
                }

                return (
                    <Cell
                        {...cell}
                        ellipsis={column.ellipsis}
                        align={column.align}
                        component={CellComponent}
                        key={columnsKey[cellIndex]}
                        {...fixedInfo}
                        additionalProps={additionalProps}
                        rowType="header"
                    />
                );
            })}
        </RowComponent>
    );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;

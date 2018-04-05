import React, { Component } from 'react';

import './Table.css';
import { updateObject } from '../../../shared/utility';

/**
 * Stateful component for rendering orderable table.
 * 
 * We should receive in props:
 * 'tableData' - an object in the folowing format:
 * {
 *  'columns': - object in folowing format: {
 *      '**columnName**': {
 *          'disaplyContent': content to display in header cell
 *          'sortable': boolean - if the column should be sorted
 *      }
 *  },
 *  'rows': - array of objects
 * }
 * 
 * @param {className, clickHandler, children} props 
 */
class Table extends Component {
    state = {
        orderBy: null,
        orderAsc: true
    }

    componentWillMount() {
        const columns = this.props.tableData.columns;
        let orderBy = null;

        for (let columnName in columns) {
            if (columns[columnName].sortable) {
                orderBy = columnName;
                break;
            }
        }

        this.setState(updateObject(this.state, { orderBy: orderBy }));
    }

    prepareHeader() {
        const columns = this.props.tableData.columns;
        const preaparedColumns = [];

        for (let columnName in columns) {
            const column = columns[columnName];
            const classes = [column.sortable ? 'Sortable' : ''];

            if (columnName === this.state.orderBy) {
                classes.push(this.state.orderAsc ? 'Asc' : 'Desc');
            }

            preaparedColumns.push((
                <th
                    key={columnName}
                    data-name={columnName}
                    className={classes.join(' ')}
                    onClick={this.onHeaderCellClickHandler}>{column.displayContent}</th>
            ));
        }

        return <tr>{preaparedColumns}</tr>;
    }

    prepareRows(data) {
        const rows = [];

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const rowData = [];

            for (let columnName in this.props.tableData.columns) {
                rowData.push(
                    <td key={columnName}>{row[columnName]}</td>
                );
            }

            rows.push(<tr key={i}>{rowData}</tr>);
        }

        return rows;
    }

    sortData(data) {
        const compare = (a, b) => {
            const elemA = typeof a[this.state.orderBy] === 'string'
                ? a[this.state.orderBy].toUpperCase()
                : a[this.state.orderBy];
            const elemB = typeof b[this.state.orderBy] === 'string'
                ? b[this.state.orderBy].toUpperCase()
                : b[this.state.orderBy];

            let comparison = 0;
            if (elemA > elemB) {
                comparison = this.state.orderAsc ? 1 : -1;
            } else if (elemA < elemB) {
                comparison = this.state.orderAsc ? -1 : 1;
            }

            return comparison;
        }

        return data.sort(compare);
    }

    onHeaderCellClickHandler = (event) => {
        if (!event.target.classList.contains('Sortable')) {
            return;
        }

        const columnName = event.target.dataset.name;

        this.setState(updateObject(this.state, {
            orderBy: columnName,
            orderAsc: this.state.orderBy === columnName ? !this.state.orderAsc : true
        }));
    }

    render() {
        const header = this.prepareHeader();
        const sortedData = this.sortData(this.props.tableData.rows);
        const rows = this.prepareRows(sortedData);

        return (
            <table className='Table'>
                <thead>{header}</thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
};

export default Table;
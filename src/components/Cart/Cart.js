import React from 'react';

import Table from '../UI/Table/Table';

/**
 * Stateless component for rendering user's cart.
 * 
 * In props we should receive:
 * 
 * 'tableData' - an object for rendering table 
 * (specific format see <Table /> for details)
 * 
 * @param {tableData} props 
 */
const cart = (props) => {
    return (
        <Table tableData={props.tableData} />
    );
};

export default cart;
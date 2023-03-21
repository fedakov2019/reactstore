import React, { useMemo } from "react";
import {useTable, usePagination,useRowSelect} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import './table.css'
import { COLUMNS} from './Colums';
import { Container } from "@mui/system";
import { Checkbox } from "./Checkbox";


export const BasicTable =() =>{
    const columns= useMemo(()=> COLUMNS,[])
    const data = useMemo(() => MOCK_DATA,[])
    const tableInstance= useTable({
        columns,
        data,
        initialState:{pageIndex:0, pageSize: 20}

    },usePagination, useRowSelect,
    (hooks) => {
        hooks.visibleColumns.push((columns) =>{
            return [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />

                    ),
                    Cell: ({row}) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    )

                },
                ...columns
            ]
        })
    }
    )
    const {getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        pageOptions,
        selectedFlatRows,
        gotoPage,
        pageCount,
        state:{pageIndex, pageSize},

    }=tableInstance

    const firstPageRows =page
    return ( <Container>
        <div>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroups)=> (
                <tr {...headerGroups.getHeaderGroupProps()}>
                   {headerGroups.headers.map((column)=> (
                    <th {...column.getHeaderProps()}>{column.render('Header')} </th>
                   ))}
                    
                </tr>

            ))}
                
            </thead>
            <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row)=>{
                prepareRow(row)
                return(
                    <tr {...row.getRowProps()}>
                    {row.cells.map((cell) =>{
                        return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
               
                </tr>
                )
            })}
                
            </tbody>
        </table>
<div>
<span>
    Страница{' '}
    <strong>
        {pageIndex+1} of {pageCount}
    </strong> {' '}
</span>
<span>
    | Перейти на:{' '}
    <input type='number'
    defaultValue={pageIndex+1}
    onChange={(e) => {
        const pageNumber=e.target.value ? Number(e.target.value)-1:0
        gotoPage(pageNumber)
    }}
    style={{width:'60px'}} />


</span>
<select
value={pageSize}
onChange={(e) => setPageSize(Number(e.target.value))}>
{[10,20,25,35,50,100].map((pageSize)=>(
    <option key={pageSize} value={pageSize}>
        Страниц {pageSize}

    </option>
))}

</select>

<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
    {'⇚'}


</button>

    <button onClick={( )=> previousPage()} disabled={!canPreviousPage}>⇤Предыдущая</button>
    <button onClick={()=> nextPage()} disabled={!canNextPage}>Следующая⇥</button>
    <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>
    {'⇛'}

    
</button>
</div>

        </div>
<pre>
    <code>
        {JSON.stringify(
            {selectedFlatRows:selectedFlatRows.map((row) => row.original),
            },
            null<
            2
        )}
    </code>
</pre>

        </Container>
    )
}
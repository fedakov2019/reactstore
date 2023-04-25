import styles from './Paginator.module.css'
import { useState } from 'react';
const Paginator=({totalItemsCount,pageSize,curerentPage,onPageChange,partionSize=10}
    )=>{
    const pageCount=Math.ceil(totalItemsCount/pageSize);
const pages=[];

for (let i=1;i<=pageCount;i++){
    pages.push(i);
}
const portionCount=Math.ceil(pageCount/partionSize);
const [portitionNumber,setPortitionNumber]=useState(1);
const leftPortitionPageNumber=(portitionNumber-1)*partionSize+1;
const rightPortitionPageNumber=portitionNumber*partionSize;
return <div className={styles.paginator}>
    {portitionNumber>1 && <button onClick={()=>{setPortitionNumber(portitionNumber-1)}}>PREV</button>}
    {pages
    .filter(p=>p>=leftPortitionPageNumber && p<=rightPortitionPageNumber)
    .map((p)=>{
        return <span className={curerentPage===p?styles.selectedPage:
            styles.pageNumber} 
            key={p}
        onClick={(e)=>{
            onPageChange(p);}}>{p}</span>
        })}
        {portionCount>portitionNumber && 
        <button onClick={()=>{setPortitionNumber(portitionNumber+1)}}>NEXT</button>}
    
</div>

    }
    export default Paginator;
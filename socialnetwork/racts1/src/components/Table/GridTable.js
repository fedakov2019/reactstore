import React, {useMemo,useEffect,useState} from "react"; 
import {Box,Typography} from '@mui/material';
import MOCK_DATA from './MOCK_DATA.json';

import { COLUMNS} from './ColumsGrid';
import { DataGrid} from "@mui/x-data-grid";
import { Container } from "@mui/system";

export const GridTable =() =>{
   
    const [platform, setPlatform] = useState([]);
    const [pageSize,setPageSize]= useState(10);
    const [rowId, setRowId] = useState(null);
    useEffect(() => {
        let platformList =MOCK_DATA;
        setPlatform(platformList);
    }, []);
    const columns= useMemo(()=> COLUMNS,[])
    
    
return (
    <Container>
    <Box
    sx={{
        hight:1800,
        widht:'100%'
    }}>
    <Typography
    variant="h3"
    component="h3"
    sx={{textAlign:'center',mt:3,mb:3}}>
        Manage Users
    </Typography>
<DataGrid
columns={columns}
rows={platform}
getRowId={(row)=>row.id}

rowsPerPageOptions={[5,10,20]}
pageSize={pageSize}
opPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
       
        onCellEditCommit={(params) => setRowId(params.id)}

        autoHeight
/>

    </Box>
    </Container>
)
}
export default GridTable;

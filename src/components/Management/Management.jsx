import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, useMediaQuery } from '@mui/material';
import { getUsers } from '../../lib/axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 260 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'role',
    headerName: 'Role',
    width: 130,
    sortable: false,
  },
  {
    field: 'address', headerName: 'Address', width: 150,
  },
  {
    field: 'status', headerName: 'Status', width: 80,
  },
  {
    field: 'orders',
    headerName: 'Orders',
    type: 'number',
    width: 100,
  },
];

const sampleRows = [
  { id: '4hfdsjkl4324kjlfsdfh4', lastName: 'Snow', firstName: 'Jon', email: 'simon@gmail.com', role: 'customer', address: 'Pog Gastanicou', status: 'offline', orders: 0 },

];

function Management() {
  const isXs = useMediaQuery('(max-width:450px)');
  const [rows, setRows] = useState(sampleRows);

  // const { onlineUsers } = useSelector(userSelector);

  useEffect(() => {
    getUsers().then((data) => {
      const users = data.map((user) => (
        {
          id: user._id,
          lastName: user.name,
          firstName: user.surname,
          email: user.email,
          role: user.role,
          address: user.address || 'none',
          status: 'offline',
          orders: user.orders.length,
        }
      ));
      setRows(users);
    });
  }, []);

  return (
    <div style={{ width: '100%', position: 'relative', marginInline: `${isXs ? '1rem' : '0'} ` }}>
      <Typography variant="h3" fontSize="2.5rem" fontWeight="600" sx={{ marginInline: { xs: '1rem' }, marginBlockEnd: '1rem', color: 'white' }}>
        Accounts
      </Typography>
      <div style={{ height: 400, width: '100%' }}>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{ backgroundColor: 'white', filter: 'drop-shadow(2px 3px 15px rgba(90, 90, 90, 0.24))' }}
        />
      </div>
    </div>

  );
}

export default Management;

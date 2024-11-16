/* eslint-disable no-unused-vars */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Table.css'; // Import the CSS file

const columns = [
  { id: 'srNo', label: 'Sr No', minWidth: 50 },
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 170 },
  { id: 'company', label: 'Company', minWidth: 170 },
  { id: 'jobTitle', label: 'Job Title', minWidth: 170 },
];

function createData(srNo, firstName, lastName, email, phoneNumber, company, jobTitle, _id) {
  return { srNo, firstName, lastName, email, phoneNumber, company, jobTitle, _id };
}

export default function StickyHeadTable() {
  const [data, setData] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/contacts/${id}`);
      toast.success('Contact deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete contact.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/contacts/${editData._id}`, editData);
      toast.success('Contact updated successfully!');
      fetchData();
      handleClose();
    } catch (error) {
      toast.error('Failed to update contact.');
    }
  };

  async function fetchData() {
    const res = await axios.get('http://localhost:8080/contacts');
    const contacts = res.data.contacts;
    console.log(contacts);

    const rows = contacts.map((contact, index) => {
      return createData(
        index + 1,
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phoneNumber,
        contact.company,
        contact.jobTitle,
        contact._id
      );
    });
    setRows(rows);
    setData(res.data.contacts);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" style={{ minWidth: 200 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} className="table-row">
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Button className="edit-delete-button" onClick={() => handleEdit(row)}>Edit</Button>
                      <Button className="edit-delete-button" onClick={() => handleDelete(row._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-contact-modal"
        aria-describedby="edit-contact-form"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2 id="edit-contact-modal">Edit Contact</h2>
          <form id="edit-contact-form" onSubmit={handleFormSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={editData.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editData.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={editData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={editData.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company"
              name="company"
              value={editData.company}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={editData.jobTitle}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </Paper>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
import * as React from "react";
import Link from "next/link";
import ImageLoader from "./ImageLoader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import AlertDialog from './DeleteUserWarning'
import PromoteDialog from './PromoteUserWarning'
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from "@mui/material";
import { Image } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';


export default function UsersTable({ columns, rows, action = false, update,setRollback}) {
  const API = `http://localhost:5000`;

  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const myLoader = ({ src }) => {
    return `${API}/profilePic/${Article.coverImage}`;
  };

  return (
    <Paper sx={{ width: "90%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 560 }} aria-label="customized table">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: "#fff",
                    fontWeight: "400",
                    fontSize: "1rem",
                    backgroundColor: "#6246ea",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.slug}>
                    <TableCell align="center">
                      <Image
                        loader={myLoader} 
                        src={`${API}/profilePic/${row.profilePic}`} 
                        alt="userProfile" 
                        className={styles.photo2} />
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{row.firstName}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{row.lastName}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography>{row.emailAddress}</Typography>
                    </TableCell>
                    <TableCell align="left">{row.userType}</TableCell>
                    {action ? (
                      <TableCell align="center">
                        <div className="actions">
                          <PromoteDialog User={row.userName} update={update} /> 
                          <AlertDialog User={row.userName} update={update} />
                        </div>
                      </TableCell>
                    ) : (
                      <div>jhvj</div>
                    )}
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
    </Paper>
  );
}

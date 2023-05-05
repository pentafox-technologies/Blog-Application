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

export default function StyledTable({ columns, rows, action = false }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                      <ImageLoader name={row.coverImage} H="100" W="100" />
                    </TableCell>
                    <TableCell align="left">
                      <Link className="Links" href={`/post/${row.slug}`}>
                        {row.title}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    {action ? (
                      <TableCell align="center">
                        <div className="actions">
                          <FontAwesomeIcon
                            style={{
                              color: "blue",
                              fontSize: "1.2rem",
                              margin: "0.5rem 1rem",
                            }}
                            icon={faPenToSquare}
                          />
                          <FontAwesomeIcon
                            style={{
                              color: "red",
                              fontSize: "1.2rem",
                              margin: "0.5rem 1rem",
                            }}
                            icon={faTrash}
                          />
                        </div>
                      </TableCell>
                    ) : (
                      <div></div>
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

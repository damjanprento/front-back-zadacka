import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody, DialogTitle, DialogContent, DialogActions, Dialog, Paper, TableContainer, makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { DeleteRepository } from "../repo/DeleteRepository";
import { Link, useParams } from 'react-router-dom';
import { useStyles } from './styles/TableStyles';
import { TableRepository } from "../repo/TableRepository";

export default function TicketTypes() {
    let { id } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [priorities, setPriorities] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState();
    const [pageableTicketTypes, setPageableTicketTypes] = useState();
    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        loadPriorities();
        loadPageableTicketTypes(0, 5);
    }, []);


    const loadPageableTicketTypes = (page, size) => {
        TableRepository.getPageableTicketTypes(page, size)
            .then((res) => {
                setPageableTicketTypes(res.data);
            })
    }

    const loadPriorities = () => {
        PostsRepository.getAllPriorities().then((res) => {
            setPriorities(res.data);
        })
    }

    const deleteTicketType = (id) => {
        DeleteRepository.deleteTicketType(id).then((res) => {
            handleCloseDialog();
            loadPageableTicketTypes(0, 5);
        })
    }

    const handleOpenDialog = (id) => {
        setDialogOpen(true);
        setSelectedForDelete(id);
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    }

    const handleChangePage = (event, newPage) => {
        loadPageableTicketTypes(newPage, pageableTicketTypes.size);
    }

    const handleChangeRowsPerPage = (event) => {
        console.log(parseInt(event.target.value))
        loadPageableTicketTypes(0, parseInt(event.target.value));
    }

    return <>

        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TableContainer className={classes.tbl} style={{ marginTop: "5%" }}>
                        <Table>
                            <TableHead>
                                <TableRow className={classes.tblHead}>
                                    <TableCell></TableCell>
                                    <TableCell><h2>Ticket-Type ID</h2></TableCell>
                                    <TableCell><h2>Ticket-Type Name</h2></TableCell>
                                    <TableCell><h2>Ticket-Type Priorities</h2></TableCell>
                                    <TableCell><h2>Details</h2></TableCell>
                                    <TableCell><h2>Delete</h2></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageableTicketTypes && pageableTicketTypes.content && pageableTicketTypes.content.length > 0 &&
                                    pageableTicketTypes.content.map((item, key) => (
                                        <TableRow className={classes.tblBody} key={key}>
                                            <TableCell>{(pageableTicketTypes.number * pageableTicketTypes.size) + (key + 1)}.</TableCell>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                {item.priorities && item.priorities.map((priority) => (
                                                    <ul>
                                                        <li>{priority.name}</li>
                                                    </ul>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/ticket_types/details/${item.id}`} style={{ textDecoration: "none" }}>
                                                    <Button color="primary" className={classes.detailsBtn}>Open</Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => {
                                                    handleOpenDialog(item.id);
                                                }} color="primary" className={classes.deleteBtn}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        count={pageableTicketTypes?.totalElements}
                                        rowsPerPage={pageableTicketTypes?.size}
                                        page={pageableTicketTypes?.number}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableRow>

                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                    <Link to={"/ticket_types/create_ticket_type"} style={{ textDecoration: "none" }}>
                        <Button
                            style={{ color: "white", backgroundColor: "black" }}
                        >
                            Create a new Ticket Type
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>


        <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
        >
            <DialogTitle>
                Confirmation
            </DialogTitle>
            <DialogContent>
                Are you sure you want to delete this ticket type?
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { deleteTicketType(selectedForDelete) }}>Yes</Button>
                <Button onClick={handleCloseDialog}>No</Button>
            </DialogActions>
        </Dialog>

    </>
}
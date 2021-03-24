import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Paper, makeStyles, IconButton, useTheme, TableFooter, TablePagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { DeleteRepository } from "../repo/DeleteRepository";
import { Link } from 'react-router-dom';
import { useStyles } from './styles/TableStyles';
import { TableRepository } from "../repo/TableRepository";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';


export default function Tickets() {
    const [loading, setLoading] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState();
    const [pageableTickets, setPageableTickets] = useState();
    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        loadPageableTickets(0, 5);

    }, []);

    const loadPageableTickets = (page, size) => {
        TableRepository.getPageableTickets(page, size)
            .then((res) => {
                console.log(res.data.content);
                setPageableTickets(res.data);
            })
    }

    const deleteTicket = (id) => {
        DeleteRepository.deleteTicket(id).then((res) => {
            handleCloseDialog();
            loadPageableTickets(0, 5);
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
        loadPageableTickets(newPage, pageableTickets.size);
    }

    const handleChangeRowsPerPage = (event) => {
        console.log(parseInt(event.target.value))
        loadPageableTickets(0, parseInt(event.target.value));
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
                                    <TableCell><h2>Ticket ID</h2></TableCell>
                                    <TableCell><h2>Ticket-Type Name</h2></TableCell>
                                    <TableCell><h2>Ticket Status</h2></TableCell>
                                    <TableCell><h2>Date Created</h2></TableCell>
                                    <TableCell><h2>Details</h2></TableCell>
                                    <TableCell><h2>Delete</h2></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageableTickets && pageableTickets.content && pageableTickets.content.length > 0 &&
                                    pageableTickets.content.map((item, key) => (
                                        <TableRow className={classes.tblBody} key={key}>
                                            <TableCell>{(pageableTickets.number * pageableTickets.size) + (key + 1)}.</TableCell>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.ticketType.name}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            <TableCell>{item.dateCreated}</TableCell>
                                            <TableCell>
                                                <Link to={`/tickets/details/${item.id}`} style={{ textDecoration: "none" }}>
                                                    <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Open</Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => {
                                                    handleOpenDialog(item.id);
                                                }} color="primary" style={{ color: "white", backgroundColor: "black" }}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        count={pageableTickets?.totalElements}
                                        rowsPerPage={pageableTickets?.size}
                                        page={pageableTickets?.number}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableRow>

                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                    <Link to={"/tickets/create_ticket"} style={{ textDecoration: "none" }}>
                        <Button
                            style={{ color: "white", backgroundColor: "black" }}
                        >
                            Create a new Ticket
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
                Are you sure you want to delete this ticket?
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { deleteTicket(selectedForDelete) }}>Yes</Button>
                <Button onClick={handleCloseDialog}>No</Button>
            </DialogActions>
        </Dialog>
    </>
}
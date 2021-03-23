import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody, DialogTitle, DialogContent, DialogActions, Dialog, Paper, TableContainer, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { DeleteRepository } from "../repo/DeleteRepository";
import { Link, useParams } from 'react-router-dom';
import { useStyles } from './styles/TableStyles';

export default function TicketTypes() {
    let { id } = useParams();
    const [ticketTypes, setTicketTypes] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [priorities, setPriorities] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState();
    const classes = useStyles();

    useEffect(() => {

        setLoading(true);
        loadPriorities();
        loadTicketTypes();
    }, []);

    const loadPriorities = () => {
        PostsRepository.getAllPriorities().then((res) => {
            setPriorities(res.data);
        })
    }

    const loadTicketTypes = () => {
        PostsRepository.getAllTicketTypes().then((res) => {
            setTicketTypes(res.data);
            setLoading(false);
        })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError("An error has occured!");
            })
    }

    const deleteTicketType = (id) => {
        DeleteRepository.deleteTicketType(id).then((res) => {
            handleCloseDialog();
            loadTicketTypes();
        })
    }

    const handleOpenDialog = (id) => {
        setDialogOpen(true);
        setSelectedForDelete(id);
    }

    const handleCloseDialog = () => {
        setDialogOpen(false);
    }

    return <>

        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TableContainer className={classes.tbl} style={{ marginTop: "5%" }}>
                        <Table>
                            <TableHead>
                                <TableRow className={classes.tblHead}>
                                    <TableCell><h2>Ticket-Type ID</h2></TableCell>
                                    <TableCell><h2>Ticket-Type Name</h2></TableCell>
                                    <TableCell><h2>Ticket-Type Priorities</h2></TableCell>
                                    <TableCell><h2>Details</h2></TableCell>
                                    <TableCell><h2>Delete</h2></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ticketTypes &&
                                    ticketTypes.length > 0 &&
                                    ticketTypes.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                {item.priorities && item.priorities.map((priority) => (
                                                    <ul>
                                                        <li>{priority.name}</li>
                                                    </ul>
                                                ))
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/ticket_types/details/${item.id}`} style={{ textDecoration: "none" }}>
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
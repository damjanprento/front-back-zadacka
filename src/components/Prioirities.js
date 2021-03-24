import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Paper, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { DeleteRepository } from "../repo/DeleteRepository";
import { Link, Redirect } from 'react-router-dom';
import { useStyles } from './styles/TableStyles';

export default function Priorities() {
    const [priorities, setPriorities] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState();
    const classes = useStyles();


    useEffect(() => {

        setLoading(true);
        loadPriorities();
    }, []);

    const loadPriorities = () => {
        PostsRepository.getAllPriorities().then((res) => {
            setPriorities(res.data);
            setLoading(false);
        })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError("An error has occured!");
            })
    }

    const deletePriority = (id) => {
        DeleteRepository.deletePriority(id).then((res) => {
            handleCloseDialog();
            loadPriorities();
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
                                    <TableCell></TableCell>
                                    <TableCell><h2>Priority ID</h2></TableCell>
                                    <TableCell><h2>Priority Name</h2></TableCell>
                                    <TableCell><h2>Details</h2></TableCell>
                                    <TableCell><h2>Delete</h2></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {priorities &&
                                    priorities.length > 0 &&
                                    priorities.map((item, key) => (
                                        <TableRow className={classes.tblBody} key={item.id}>
                                            <TableCell>{key}.</TableCell>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <Link to={`/priorities/details/${item.id}`} style={{ textDecoration: "none" }}>
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
                    <Link to={"/priorities/create_priority"} style={{ textDecoration: "none" }}>
                        <Button
                            style={{ color: "white", backgroundColor: "black" }}
                        >
                            Create a new Priority
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
                Are you sure you want to delete this priority?
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { deletePriority(selectedForDelete) }}>Yes</Button>
                <Button onClick={handleCloseDialog}>No</Button>
            </DialogActions>
        </Dialog>
    </>
}
import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Paper, makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { DeleteRepository } from "../repo/DeleteRepository";
import { Link, Redirect } from 'react-router-dom';
import { useStyles } from './styles/TableStyles';
import { TableRepository } from "../repo/TableRepository";

export default function Priorities() {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState();
    const [pageablePriorities, setPageablePriorities] = useState();
    const classes = useStyles();


    useEffect(() => {
        setLoading(true);
        loadPageablePriorities(0, 5);
    }, []);

    const loadPageablePriorities = (page, size) => {
        TableRepository.getPageablePriorities(page, size)
            .then((res) => {
                setPageablePriorities(res.data);
            })
    }

    const deletePriority = (id) => {
        DeleteRepository.deletePriority(id).then((res) => {
            handleCloseDialog();
            loadPageablePriorities(0, 5);
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
        loadPageablePriorities(newPage, pageablePriorities.size);
    }

    const handleChangeRowsPerPage = (event) => {
        console.log(parseInt(event.target.value))
        loadPageablePriorities(0, parseInt(event.target.value));
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
                                {pageablePriorities && pageablePriorities.content && pageablePriorities.content.length > 0 &&
                                    pageablePriorities.content.map((item, key) => (
                                        <TableRow className={classes.tblBody} key={key}>
                                            <TableCell>{(pageablePriorities.number * pageablePriorities.size) + (key + 1)}.</TableCell>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <Link to={`/priorities/details/${item.id}`} style={{ textDecoration: "none" }}>
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
                                        count={pageablePriorities?.totalElements}
                                        rowsPerPage={pageablePriorities?.size}
                                        page={pageablePriorities?.number}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableRow>

                            </TableFooter>
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
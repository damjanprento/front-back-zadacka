import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostsRepository } from "../repo/PostRepository";
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: "30%",
        marginTop: "1%"
    },
    item: {
        padding: theme.spacing(2),
        width: "100%",
    },
    desc: {
        height: "30px",
        textAlign: "center",
        color: theme.palette.text.primary,
        backgroundColor: "lightblue"
    }
}));

export default function TicketType() {
    let { id } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
        name: '',
        groups: [],
        priorities: []
    });

    const [priorities, setPriorities] = useState();
    const [groups, setGroups] = useState();

    useEffect(() => {
        loadData();
        PostsRepository.getAllPriorities().then(res => {
            setPriorities(res.data);
        });
    }, []);

    const loadData = () => {
        PostsRepository.getTicketTypeById(id).then(res => {
            console.log(res.data);
            setFormData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <>
            {loading && "Loading..."}
            {error && "Error: " + error}
            <div className={useStyles("").root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Grid item xs={12} className={useStyles("").item}>
                            <Paper className={useStyles("").desc}>Ticket Type with ID: <b>{id}</b></Paper>
                        </Grid>
                        <Grid item xs={12} className={useStyles("").item}>
                            <TextField
                                disabled
                                fullWidth
                                variant="outlined"
                                label='Name'
                                type="text"
                                value={formData.name}
                            />
                        </Grid>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Priorities for the current Ticket-Type</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                formData.priorities && formData.priorities.map((priority) => (
                                    <>
                                        <TableBody>
                                            <TableRow key={priority.id}>
                                                <TableCell>
                                                    {priority.name}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </>
                                ))
                            }
                        </Table>

                        <Grid item xs={12} md={12}>

                            <p>
                                <Link push="true" to="/ticket_types" style={{ textDecoration: "none" }}>
                                    <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Back</Button>
                                </Link>
                            </p>

                            <p>
                                <Link push="true" to={`/ticket_types/edit_ticket_type/${id}`} style={{ textDecoration: "none" }}>
                                    <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Edit</Button>
                                </Link>
                            </p>
                        </Grid>

                    </Grid>
                </Grid>
            </div>

        </>
    );
}

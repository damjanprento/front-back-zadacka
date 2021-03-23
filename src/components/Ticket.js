import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostsRepository } from "../repo/PostRepository";
import { Button, Container, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from "@material-ui/lab";
import { useStyles } from "./styles/EditFormStyles";

export default function Ticket() {
    let { id } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
        subject: '',
        description: '',
        ticketType: ''
    });

    const [ticketTypes, setTicketTypes] = useState();

    useEffect(() => {
        loadData();
        PostsRepository.getAllTicketTypes()
            .then((res) => {
                setTicketTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError("An error has occured!");
            })
    }, []);

    const loadData = () => {
        PostsRepository.getTicketById(id).then(res => {
            setFormData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <div>
                <Container style={{ marginTop: "3%" }}>
                    <Grid container spacing={3}>
                        <Grid item sm={2} md={2}></Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ textAlign: "center" }}>
                                    <form >
                                        <Grid item xs={12} className={useStyles("").item}>
                                            <Paper className={useStyles("").desc}>Details for ticket with ID: <b>{id}</b></Paper>
                                        </Grid>
                                        <Grid item xs={12} className={useStyles("").item}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                multiline
                                                variant="outlined"
                                                label='Description'
                                                type="text"
                                                value={formData.description}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={useStyles("").item}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                variant="outlined"
                                                label="Status"
                                                type="text"
                                                value={formData.status ? formData.status : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={useStyles("").item}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                variant="outlined"
                                                label='Subject'
                                                type="text"
                                                value={formData.subject}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={useStyles("").item}>
                                            <InputLabel>Ticket Type</InputLabel>
                                            <Select
                                                disabled
                                                defaultValue=""
                                                fullWidth
                                                value={formData?.ticketType?.id || ""}
                                            >
                                                {ticketTypes &&
                                                    ticketTypes.length > 0 &&
                                                    ticketTypes.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                    ))}
                                            </Select>
                                        </Grid>
                                    </form>
                                    <Grid item xs={12} md={12}>
                                        <p>
                                            <Link push="true" to="/tickets" style={{ textDecoration: "none" }}>
                                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Back</Button>
                                            </Link>
                                        </p>

                                        <p>
                                            <Link push="true" to={`/tickets/edit_ticket/${id}`} style={{ textDecoration: "none" }}>
                                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Edit</Button>
                                            </Link>
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={2} md={2}></Grid>
                    </Grid>
                </Container>
            </div>

        </>
    );
}

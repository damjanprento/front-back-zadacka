import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostsRepository } from "../repo/PostRepository";
import { Button, Container, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: "30%"
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
            {loading && "Loading..."}
            {error && "Error: " + error}

            <div className={useStyles("").root}>
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

                            {/* <Grid item xs={12}>
                                <Autocomplete
                                    noOptionsText={'Нема опции'}
                                    autoComplete={false}
                                    size="small"
                                    value={
                                        formData?.fatherData?.birthCountry?.name
                                            ? formData.fatherData.birthCountry.name
                                            : ""
                                    }
                                />
                            </Grid> */}
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
            </div>

        </>
    );
}

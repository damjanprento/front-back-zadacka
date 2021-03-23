import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostsRepository } from "../repo/PostRepository";
import { Button, Container, Grid, makeStyles, Paper, TextField } from "@material-ui/core";

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

export default function Priority() {
    let { id } = useParams();

    const [priorityData, setPriorityData] = useState({
        name: ''
    });

    const [loading, setLoading] = useState();
    const [error, setError] = useState();


    useEffect(() => {

        setLoading(true);
        PostsRepository.getPriorityById(id)
            .then((res) => {
                setPriorityData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError("An error occured!");
            });
    }, []);

    return (
        <>
            {loading && "Loading..."}
            {error && "Error: " + error}


            <div className={useStyles("").root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <form >
                            <Grid item xs={12} className={useStyles("").item}>
                                <Paper className={useStyles("").desc}>Details for Priority with name: <b>{priorityData.name}</b></Paper>
                            </Grid>
                            <Grid item xs={12} className={useStyles("").item}>
                                <TextField
                                    fullWidth
                                    disabled
                                    variant="outlined"
                                    label='Name'
                                    type="text"
                                    value={priorityData.name}
                                />
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                        <p>
                            <Link push="true" to="/priorities" style={{ textDecoration: "none" }}>
                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Back</Button>
                            </Link>
                        </p>
                        <p>
                            <Link push="true" to={`/priorities/edit_priority/${id}`} style={{ textDecoration: "none" }}>
                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Edit</Button>
                            </Link>
                        </p>
                    </Grid>
                </Grid>
            </div>

        </>
    );
}

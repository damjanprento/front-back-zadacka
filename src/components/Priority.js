import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostsRepository } from "../repo/PostRepository";
import { Button, Container, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import { useStyles } from "./styles/EditFormStyles";

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
            <div>
                <Container style={{ marginTop: "3%" }}>
                    <Grid container spacing={3}>
                        <Grid item sm={2} md={2}></Grid>
                        <Grid item xs={12} sm={8} md={8}>
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
                        </Grid>
                        <Grid item sm={2} md={2}></Grid>

                    </Grid>
                </Container>
            </div>

        </>
    );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostsRepository } from "../repo/PostRepository";
import { Button, Container, Grid } from "@material-ui/core";

export default function Priority() {
    let { id } = useParams();
    const [priorityData, setPriorityData] = useState();
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
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <h1>Priority ID: {id}</h1>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <h2>Priority Name: {priorityData?.name}</h2>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <p>Priority created by: {priorityData?.createdBy}</p>
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
            </Container>

        </>
    );
}

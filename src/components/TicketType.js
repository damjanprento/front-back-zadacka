import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PostsRepository } from "../repo/PostRepository";
import { Button, Container, Grid } from "@material-ui/core";

export default function TicketType() {
    let { id } = useParams();
    const [ticketTypeData, setTicketTypeData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {

        setLoading(true);
        PostsRepository.getTicketTypeById(id)
            .then((res) => {
                setTicketTypeData(res.data);
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
                        <h1>Ticket-Type ID: {id}</h1>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <h2>Ticket-Type Name: {ticketTypeData?.name}</h2>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <p>Ticket created by: {ticketTypeData?.createdBy}</p>
                        <p>
                            <Link push="true" to="/ticket_types" style={{ textDecoration: "none" }}>
                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Back</Button>
                            </Link>
                        </p>
                        <p>
                            <Link push="true" to={`/ticket_types/edit_ticketType/${id}`} style={{ textDecoration: "none" }}>
                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Edit</Button>
                            </Link>
                        </p>
                    </Grid>
                </Grid>
            </Container>

        </>
    );
}

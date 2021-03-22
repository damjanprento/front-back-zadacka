import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { Link } from 'react-router-dom';

export default function Tickets() {
    const [tickets, setTickets] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {

        setLoading(true);
        PostsRepository.getAllTickets().then((res) => {
            setTickets(res.data);
            setLoading(false);
        })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError("An error has occured!");
            })
    }, []);

    return <>

        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ticket ID</TableCell>
                                <TableCell>Ticket-Type Name</TableCell>
                                <TableCell>Ticket Status</TableCell>
                                <TableCell>Date Created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets &&
                                tickets.length > 0 &&
                                tickets.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.ticketType.name}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{item.dateCreated}</TableCell>
                                        <TableCell>
                                            <Link to={`/tickets/details/${item.id}`} style={{ textDecoration: "none" }}>
                                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Open</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                    <Link to={"/tickets/create_ticket"} style={{ textDecoration: "none" }}>
                        <Button
                            style={{ color: "white", backgroundColor: "black" }}
                        >
                            Create a new Ticket
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>

    </>
}
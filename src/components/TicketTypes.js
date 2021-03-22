import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { Link } from 'react-router-dom';

export default function TicketTypes() {
    const [ticketTypes, setTicketTypes] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {

        setLoading(true);
        PostsRepository.getAllTicketTypes().then((res) => {
            setTicketTypes(res.data);
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
                                <TableCell>Ticket-Type ID</TableCell>
                                <TableCell>Ticket-Type Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketTypes &&
                                ticketTypes.length > 0 &&
                                ticketTypes.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <Link to={`/ticket_types/details/${item.id}`} style={{ textDecoration: "none" }}>
                                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Open</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                    <Link to={"/ticket_types/create_ticket_type"} style={{ textDecoration: "none" }}>
                        <Button
                            style={{ color: "white", backgroundColor: "black" }}
                        >
                            Create a new Ticket Type
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>

    </>
}
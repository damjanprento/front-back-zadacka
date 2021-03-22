import React from 'react';
import { Grid, Table, TableCell, TableRow, Container, Button, TableHead, TableBody } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { PostsRepository } from "../repo/PostRepository";
import { Link } from 'react-router-dom';

export default function Priorities() {
    const [priorities, setPriorities] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {

        setLoading(true);
        PostsRepository.getAllPriorities().then((res) => {
            setPriorities(res.data);
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
                                <TableCell>Priority ID</TableCell>
                                <TableCell>Priority Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {priorities &&
                                priorities.length > 0 &&
                                priorities.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <Link to={`/priorities/details/${item.id}`} style={{ textDecoration: "none" }}>
                                                <Button color="primary" style={{ color: "white", backgroundColor: "black" }}>Open</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
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

    </>
}
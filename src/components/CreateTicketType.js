import { Button, Container, Grid, Hidden, InputLabel, MenuItem, Paper, Select, Table, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router';
import { PostsRepository } from '../repo/PostRepository';
import { EditInfoRepository } from '../repo/EditInfoRepository';
import { PostInfoRepository } from '../repo/PostInfoRepository';
import { useStyles } from './styles/EditFormStyles';

export default function CreateTicketType(props) {
    const [formData, setFormData] = useState({
        name: '',
        groups: [],
        priorities: []
    });
    const [error, setError] = useState();
    const [redirectTo, setRedirectTo] = useState();
    const [priorities, setPriorities] = useState();

    useEffect(() => {
        PostsRepository.getAllPriorities().then(res => {
            setPriorities(res.data);
        });
    }, []);

    const handleChangeFormData = (name, value) => {
        console.log(value);
        let newFormData = { ...formData };
        newFormData[name] = value;
        console.log(newFormData);
        setFormData(newFormData);
    }

    const handleSubmit = () => {
        PostInfoRepository.createTicketType(formData)
            .then((res) => {
                setFormData(res.data);
                setRedirectTo('/ticket_types');
            })
            .catch((err) => {
                console.log(err);
                setError("An error occured!");
            });
    }

    const addPriority = (priority) => {
        console.log(formData);
        let data = { ...formData };
        data.priorities.push(priority);
        console.log(data);
        setFormData(data);
    }


    const removePriority = (priority) => {
        console.log(formData);
        let data = { ...formData };
        let index = data.priorities.indexOf(priority);
        console.log(index);
        data.priorities.splice(index, 1);
        console.log(data);
        setFormData(data);
    }

    return <>
        {
            redirectTo && <Redirect to={redirectTo} push={true} />
        }
        <div >
            <Container style={{ marginTop: "3%" }}>
                <Grid container spacing={3}>
                    <Grid item sm={2} md={2}></Grid>
                    <Grid item xs={12} sm={8} md={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Grid item xs={12} className={useStyles("").item}>
                                    <Paper className={useStyles("").desc}>Create a new Ticket Type</Paper>
                                </Grid>
                                <Grid item xs={12} className={useStyles("").item}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label='Name'
                                        type="text"
                                        onChange={(e) => handleChangeFormData("name", e.target.value)}
                                        value={formData.name}
                                    />
                                </Grid>
                                <Table>
                                    {
                                        priorities && priorities.map((priority) => (
                                            <>
                                                <TableHead>

                                                    <TableRow key={priority.id}>
                                                        <TableCell>
                                                            {priority.name}
                                                        </TableCell>
                                                        <TableCell style={{ textAlign: "right" }}>
                                                            {
                                                                formData.priorities &&
                                                                formData.priorities.filter(p => p.id === priority.id).length === 0 &&
                                                                <Button
                                                                    onClick={() => addPriority(priority)}
                                                                    style={{ backgroundColor: "green", color: "white" }}
                                                                >
                                                                    Add
                                                    </Button>
                                                            }
                                                            {
                                                                formData.priorities &&
                                                                formData.priorities.filter(p => p.id === priority.id).length !== 0 &&
                                                                <Button
                                                                    onClick={() => removePriority(priority)}
                                                                    style={{ backgroundColor: "red", color: "white" }}
                                                                >
                                                                    Remove
                                                    </Button>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            </>
                                        ))
                                    }
                                </Table>

                                <Grid item xs={12} className={useStyles("").item}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        size='large'
                                        onClick={handleSubmit}
                                    >
                                        Submit
                            </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={2} xs={2}></Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </>

}
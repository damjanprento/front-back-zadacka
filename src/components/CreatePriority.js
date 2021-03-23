import { Button, Container, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router';
import { PostsRepository } from '../repo/PostRepository';
import { EditInfoRepository } from '../repo/EditInfoRepository';
import { PostInfoRepository } from '../repo/PostInfoRepository';
import { useStyles } from "./styles/EditFormStyles";

export default function CreatePriority(props) {
    const [formData, setFormData] = useState({
        name: '',
    });
    const [error, setError] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [redirectTo, setRedirectTo] = useState();

    useEffect(() => {
        PostsRepository.getAllTicketTypes()
            .then((res) => {
                setTicketTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError("An error has occured!");
            })
    }, []);


    const handleChangeFormData = (name, value) => {
        console.log(value);
        let newFormData = { ...formData };
        newFormData[name] = value;
        console.log(newFormData);
        setFormData(newFormData);
    }


    const handleSubmit = () => {
        PostInfoRepository.createPriority(formData)
            .then((res) => {
                console.log(res.data);
                setFormData(res.data);
                setRedirectTo("/priorities");
            })
            .catch((err) => {
                console.log(err);
                setError("An error occured!");
            });
    }

    return <>
        {
            redirectTo && <Redirect to={redirectTo} push={true} />
        }
        <div>
            <Container style={{ marginTop: "3%" }}>
                <Grid container spacing={3}>
                    <Grid item sm={2} md={2}></Grid>
                    <Grid item xs={12} sm={8} md={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <form >
                                    <Grid item xs={12} className={useStyles("").item}>
                                        <Paper className={useStyles("").desc}>Create a new Priority</Paper>
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

                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2} md={2}></Grid>
                </Grid>
            </Container>
        </div>
    </>

}
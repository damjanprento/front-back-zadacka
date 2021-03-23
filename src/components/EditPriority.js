import { Button, Container, Grid, Hidden, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router';
import { PostsRepository } from '../repo/PostRepository';
import { EditInfoRepository } from '../repo/EditInfoRepository';
import { useStyles } from "./styles/EditFormStyles";

export default function EditPriority(props) {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        name: ''
    });
    const [error, setError] = useState();
    const [redirectTo, setRedirectTo] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        PostsRepository.getPriorityById(id)
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChangeFormData = (name, value) => {
        let newFormData = { ...formData };
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const handleSubmit = () => {
        EditInfoRepository.editPriorityInfo(formData)
            .then((res) => {
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
                                        <Paper className={useStyles("").desc}>Edit Priority with name: <b>{formData.name}</b></Paper>
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
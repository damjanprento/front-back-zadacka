import { Button, Grid, Hidden, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { PostsRepository } from '../repo/PostRepository';
import { EditInfoRepository } from '../repo/EditInfoRepository';

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

export default function EditPriority(props) {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        createdBy: ''
    });
    const [error, setError] = useState();

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
            })
            .catch((err) => {
                console.log(err);
                setError("An error occured!");
            });
    }

    return <>

        <div className={useStyles("").root}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <form >
                        <Grid item xs={12} className={useStyles("").item}>
                            <Paper className={useStyles("").desc}>Edit Priority with ID: <b>{id}</b></Paper>
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
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Created By"
                                type="text"
                                onChange={(e) => handleChangeFormData("createdBy", e.target.value)}
                                value={formData.createdBy}
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
        </div>
    </>

}
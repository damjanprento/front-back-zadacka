import { Button, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { PostsRepository } from '../repo/PostRepository';
import { EditInfoRepository } from '../repo/EditInfoRepository';
import { PostInfoRepository } from '../repo/PostInfoRepository';

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

export default function CreatePriority(props) {
    const [formData, setFormData] = useState({
        name: '',
    });
    const [error, setError] = useState();
    const [ticketTypes, setTicketTypes] = useState();

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
        </div>
    </>

}
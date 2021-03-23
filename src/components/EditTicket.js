import { Button, Grid, Hidden, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useParams } from 'react-router';
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

export default function EditTicket(props) {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        description: '',
        status: '',
        subject: '',
        ticketType: ''
    });
    const [error, setError] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [redirectTo, setRedirectTo] = useState();

    useEffect(() => {
        loadData();
        PostsRepository.getAllTicketTypes()
            .then((res) => {
                setTicketTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError("An error has occured!");
            })
    }, []);

    const loadData = () => {
        PostsRepository.getTicketById(id).then(res => {
            setFormData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleChangeFormData = (name, value) => {
        console.log(value);
        let newFormData = { ...formData };
        if (name === "ticketType") {
            ticketTypes.forEach(type => {
                if (type.id === value) {
                    newFormData[name] = type;
                }
            })
        } else {
            newFormData[name] = value;
        }
        console.log(newFormData);
        setFormData(newFormData);
    }

    const handleSubmit = () => {
        EditInfoRepository.editTicketInfo(formData)
            .then((res) => {
                setFormData(res.data);
                setRedirectTo("/tickets");
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
        <div className={useStyles("").root}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <form >
                        <Grid item xs={12} className={useStyles("").item}>
                            <Paper className={useStyles("").desc}>Edit ticket with ID: <b>{id}</b></Paper>
                        </Grid>
                        <Grid item xs={12} className={useStyles("").item}>
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                label='Description'
                                type="text"
                                onChange={(e) => handleChangeFormData("description", e.target.value)}
                                value={formData.description}
                            />
                        </Grid>
                        <Grid item xs={12} className={useStyles("").item}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Status"
                                type="text"
                                onChange={(e) => handleChangeFormData("status", e.target.value)}
                                value={formData.status}
                            />
                        </Grid>
                        <Grid item xs={12} className={useStyles("").item}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label='Subject'
                                type="text"
                                onChange={(e) => handleChangeFormData("subject", e.target.value)}
                                value={formData.subject}
                            />
                        </Grid>
                        <Grid item xs={12} className={useStyles("").item}>
                            <InputLabel>Ticket Type</InputLabel>
                            <Select
                                defaultValue=""
                                fullWidth
                                value={formData?.ticketType?.id || ""}
                                onChange={(e) => handleChangeFormData("ticketType", e.target.value)}
                            >
                                {ticketTypes &&
                                    ticketTypes.length > 0 &&
                                    ticketTypes.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))}
                            </Select>
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
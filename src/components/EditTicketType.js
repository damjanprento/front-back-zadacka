import { Button, Grid, Hidden, Paper, Table, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory, useParams } from 'react-router-dom';
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

export default function EditTicketType(props) {
    let { id } = useParams();
    let history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        groups: [],
        priorities: []
    });
    const [error, setError] = useState();
    const [priorities, setPriorities] = useState();
    const [redirectTo, setRedirectTo] = useState();

    useEffect(() => {
        loadData();
        PostsRepository.getAllPriorities().then(res => {
            setPriorities(res.data);
        });
    }, []);

    const loadData = () => {
        PostsRepository.getTicketTypeById(id).then(res => {
            setFormData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleChangeFormData = (name, value) => {
        let newFormData = { ...formData };
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const handleSubmit = () => {
        EditInfoRepository.editTicketTypeInfo(formData)
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
        let index = 0;
        data.priorities.forEach((p, i) => {
            if (priority.id === p.id) index = i;
        });
        console.log(index);
        data.priorities.splice(index, 1);
        console.log(data);
        setFormData(data);
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
                            <Paper className={useStyles("").desc}>Edit ticket-type with name: <b>{formData.name}</b></Paper>
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

                    </form>
                </Grid>
            </Grid>
        </div>
    </>

}
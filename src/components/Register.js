import { Button, Container, Grid, LinearProgress, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { CreateUserService } from '../repo/CreateUserService';

export default function Register() {

    const [loading, setLoading] = useState(false);
    const [globalFormError, setGlobalFormError] = useState();
    const [redirectTo, setRedirectTo] = useState();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        type: "",
        email: ""
    });

    const handleChangeFormData = (name, value) => {
        let newFormData = { ...formData };
        newFormData[name] = value;
        setFormData(newFormData);
    }


    const handleRegister = () => {
        setLoading(true);
        delete formData.confirmPassword;
        console.log(formData);
        CreateUserService.createUser(formData)
            .then(res => {
                setLoading(false);
                setRedirectTo("/login");
            }).catch(err => {
                setLoading(false);
            })
    }

    return <>
        {
            redirectTo && <Redirect to={redirectTo} push={true} />
        }
        <Container>
            <Grid container spacing={2} style={{ marginTop: "100px" }}>
                <Grid md={4}>

                </Grid>
                <Grid md={4}>
                    <Grid container spacing={3}>

                        {
                            loading &&
                            <Grid item xs={12}>
                                <LinearProgress color="secondary" />
                            </Grid>
                        }

                        <Grid item xs={12}><h1 style={{ margin: '0px' }}>Register</h1></Grid>


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="E-mail"
                                onChange={(e) => handleChangeFormData("email", e.target.value)}
                                value={formData.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="User-Type"
                                onChange={(e) => handleChangeFormData("type", e.target.value)}
                                value={formData.type}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Username"
                                onChange={(e) => handleChangeFormData("username", e.target.value)}
                                value={formData.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Password"
                                type="password"
                                onChange={(e) => handleChangeFormData("password", e.target.value)}
                                value={formData.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                onChange={(e) => handleChangeFormData("confirmPassword", e.target.value)}
                                value={formData.confirmPassword}
                            />
                        </Grid>

                        {
                            (formData.password && formData.password === formData.confirmPassword) &&
                            <Grid item xs={12}>
                                <Alert severity="success" fullWidth>
                                    Passwords are matching!
                                </Alert>
                            </Grid>
                        }
                        {
                            (formData.password !== formData.confirmPassword) &&
                            <Grid item xs={12}>
                                <Alert severity="error" fullWidth>
                                    Passwords are not matching.
                                </Alert>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Button fullWidth color="primary" variant="contained" disabled={loading} onClick={() => { handleRegister() }}>Create an account</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid md={4}>

                </Grid>

            </Grid>

        </Container>
    </>
}
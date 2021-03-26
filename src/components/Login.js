import { Button, Container, Grid, LinearProgress, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { AuthService } from '../repo/AuthService';

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [globalFormError, setGlobalFormError] = useState();

    const handleLogin = () => {
        setLoading(true);
        setGlobalFormError();
        axios({
            url: `http://localhost:8888/oauth/token?username=${username}&password=${password}&grant_type=password`,
            method: "POST",
            headers: {
                Authorization: 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0'
            }
        }).then(res => {
            setLoading(false);
            console.log(res.data);
            AuthService.storeToken(res.data);
        }).catch(err => {
            setLoading(false);
            setGlobalFormError(err.message);
        })
    }

    return <>
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
                        {
                            globalFormError &&
                            <Grid item xs={12}>
                                <Alert severity="error" fullWidth>
                                    {globalFormError}
                                </Alert>
                            </Grid>

                        }
                        <Grid item xs={12}><h1 style={{ margin: '0px' }}>Login</h1></Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={username}
                                variant="outlined"
                                fullWidth
                                label="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                variant="outlined"
                                fullWidth
                                label="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth color="primary" disabled={loading} variant="contained" onClick={() => { handleLogin() }}>Login</Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <h3 style={{ margin: '0px' }}>Or, if you don't have an account:</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to='/register' push="true" style={{ textDecoration: 'none' }}>
                                <Button fullWidth color="primary" disabled={loading} variant="contained">Register here</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid md={4}>

                </Grid>

            </Grid>

        </Container>
    </>
}
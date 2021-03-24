import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        // margin: "auto",
    },
    nav: {
        width: "100%",
        height: "50px",
        backgroundColor: "black",
        color: "white",
    },
    prostor: {
        margin: theme.spacing(1),
    },
    btncolor: {
        backgroundColor: "none",
        color: "white",
    },
    centralize: {
        marginLeft: "auto",
        marginRight: "auto"
    }
}));

export default function Nav() {
    const classes = useStyles();

    return <>
        <div className={classes.nav}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item sm={2} md={2}></Grid>
                    <Grid item xs={12} sm={8} md={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <span style={{ lineHeight: '2.3' }}>TICKETING SYSTEM</span>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                                <Link to='/' style={{ textDecoration: 'none' }}>
                                    <Button className={classes.btncolor}>Home</Button>
                                </Link>
                                <Link to='/tickets' push="true" style={{ textDecoration: 'none' }}>
                                    <Button className={classes.btncolor}>Tickets</Button>
                                </Link>
                                <Link to='/ticket_types' push="true" style={{ textDecoration: 'none' }}>
                                    <Button className={classes.btncolor}>Ticket Types</Button>
                                </Link>
                                <Link to='/priorities' push="true" style={{ textDecoration: 'none' }}>
                                    <Button className={classes.btncolor}>Priorities</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2} md={2}></Grid>
                </Grid>
            </Container>
        </div>
    </>
}
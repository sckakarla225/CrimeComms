import React, { useContext, useState, useEffect } from 'react'; 
import { CrimeContext } from '../context/CrimeContext'; 

// COMPONENTS
import { Modal, Button } from 'react-bootstrap'; 
import { makeStyles } from '@material-ui/core/styles';

// LOCATION FORM STYLES
const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
}));

export const LocationModal = (props) => {
    const { setUserLocation } = useContext(CrimeContext); 
    const classes = useStyles();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation([position.coords.latitude, position.coords.longitude]); 
        });  
    }, [])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <h1>WELCOME TO CRIMECOMMS</h1><br/>
                <p>A Real-Time Crime Data & Report App in your Neighborhood</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p> 
                    NOTE: (For demo purposes, users can send crime signals
                    from random locations close to their own)
                </p>
                <h5>Allow the site to use your location and press GO to get started!</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>GO!</Button>
            </Modal.Footer>
        </Modal>
    )
}

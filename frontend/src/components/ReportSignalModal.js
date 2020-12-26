import React, { useState, useContext, useEffect } from 'react'; 
import { CrimeContext } from '../context/CrimeContext';

// COMPONENTS
import { Modal, Button } from 'react-bootstrap'; 

export const ReportSignalModal = (props) => {
    const { sendSignal, userLocation, crimes } = useContext(CrimeContext); 
    const [signal, setSignal] = useState({
        coordinates: [35.790286699999996, -78.91546439999999], 
        crime_match: 0, 
    });

    const getSignalData = () => {
        const latitude = 35.790286699999996; 
        const longitude = -78.91546439999999; 
        let signalLatitude; 
        let signalLongitude; 
        const latMax = latitude + 0.05; 
        const latMin = latitude - 0.05; 
        const longMax = longitude + 0.05; 
        const longMin = longitude - 0.05; 
        signalLatitude = Math.random() * (latMax - latMin) + latMin; 
        signalLongitude = Math.random() * (longMax - longMin) + longMin; 

        const crime = crimes[crimes.length - 1]

        setSignal({
            ...signal,  
            crime_match: crime.id, 
        }); 
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <h1>REPORT A SIGNAL</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Send a crime signal from your current location?</p>
                <p>(For the purposes of this demo, the signal will be sent from a random location near your location)</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    getSignalData(); 
                    if (signal.coordinates !== []) {
                        sendSignal(signal); 
                        props.onHide(); 
                    } else {
                        console.log("Coordinates and/or crime match are empty"); 
                    }
                }}>SEND!</Button>
            </Modal.Footer>
        </Modal>
    )
}

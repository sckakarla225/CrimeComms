import React, { useState, useContext, useEffect } from 'react'; 
import { CrimeContext } from '../context/CrimeContext';

// COMPONENTS
import { Modal, Button } from 'react-bootstrap'; 
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

// REPORT CRIME FORM STYLES
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
}));

export const ReportCrimeModal = (props) => {
    const { sendCrime, userLocation } = useContext(CrimeContext); 
    const [crime, setCrime] = useState({
        description: "",  
        coordinates: [35.790286699999996, -78.91546439999999], 
    }); 
    const classes = useStyles(); 

    const onChange = (e) => {
        setCrime({
            ...crime, 
            description: e.target.value
        }); 
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton style={{ textAlign: 'center' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                <h1>REPORT A CRIME</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl className={classes.formControl}>
                    <h4>Please provide brief details about the crime: </h4>
                    <TextField 
                        id="standard-basic" 
                        label="Crime Details" 
                        name="description" 
                        value={crime.description}
                        onChange={(e) => onChange(e)}
                    />
                </FormControl>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    if (crime.description !== "") {
                        sendCrime(crime); 
                        props.onHide(); 
                    } else {
                        console.log("Crime description is empty"); 
                    }
                }}>REPORT CRIME</Button>
            </Modal.Footer>
        </Modal>
    )
}

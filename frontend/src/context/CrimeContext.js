import React, { createContext, useState } from 'react'; 

export const CrimeContext = createContext(); 

export const CrimeContextProvider = (props) => {
    const [crimes, setCrimes] = useState([]); 
    const [signals, setSignals] = useState([]);
    const [userLocation, setUserLocation] = useState([]); 
    
    const getCrimes = () => {
        fetch('http://127.0.0.1:8000/api/get_crimes/').then((response) => response.json()).then(
            (data) => {
                setCrimes(data); 
                console.log("Crimes recieved successfully!"); 
            }
        );
    }

    const getSignals = () => {
        fetch('http://127.0.0.1:8000/api/get_signals/').then((response) => response.json()).then(
            (data) => {
                setSignals(data); 
                console.log("Signals recieved successfully!"); 
            }
        ); 
    }

    const sendCrime = (crime) => {
        try {
            fetch('http://127.0.0.1:8000/api/send_crime/', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json', 
                }, 
                body: JSON.stringify(crime), 
            }).then((response) => response.json()).then((data) => {
                console.log(data); 
                console.log("Crime sent successfully!"); 
                getCrimes();
            }); 
        } catch (error) {
            console.log(error); 
            console.log("Error with sending crime"); 
        }
    }

    const sendSignal = (signal) => {
        try {
            fetch('http://127.0.0.1:8000/api/send_signal/', {
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json', 
                }, 
                body: JSON.stringify(signal),
            }).then((response) => response.json()).then((data) => {
                console.log(data); 
                console.log("Signal successfully sent!"); 
                getSignals(); 
            }); 
        } catch (error) {
            console.log(error); 
            console.log("Error with sending signal"); 
        }
    }

    return (
        <CrimeContext.Provider value={{ crimes, signals, userLocation, setUserLocation, getCrimes, sendCrime, getSignals, sendSignal }}>
            { props.children }
        </CrimeContext.Provider>
    )
}
import React, { useState, useEffect, useContext } from 'react';
import '../App.css'; 
import { CrimeContext } from '../context/CrimeContext'; 

import ReactMapGL, { Marker, Popup } from 'react-map-gl'; 
import { ReportSignalFab } from './ReportSignalFab'; 
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

export const Map = () => {
    const { userLocation, getCrimes, crimes, getSignals, signals, setUserLocation } = useContext(CrimeContext); 

    const classes = useStyles(); 

    const [viewport, setViewport] = useState({
        latitude: 47.6062,   
        longitude: -122.3321,
        width: "100vw",
        height: "100vh",
        zoom: 12,
    });

    const [selectedCrime, setSelectedCrime] = useState("0"); 
    const [selectedSignals, setSelectedSignals] = useState([]); 
    const [selectedMarker, setSelectedMarker] = useState(null); 

    useEffect(() => { 
        setViewport({
            ...viewport, 
            latitude: userLocation ? userLocation[0] : 47.6062, 
            longitude: userLocation ? userLocation[1] : -122.3321, 
        }); 
        getCrimes();
        getSignals(); 
    }, []);

    const crimeMarkerStyle = {
        fontSize: 50, 
    }

    const crimeMarkerStyle2 = {
        fontSize: 50, 
        border: '3px solid white'
    }

    const signalMarkerStyle = {
        fontSize: 30, 
    }

    const signalMarkerStyle2 = {
        fontSize: 30, 
        border: '3px solid white'
    }

    const highlightMarkings = (crime) => {
        console.log(crime.id); 
        setSelectedCrime(crime.id); 
        signals.map((signal) => {
            if (signal.crime_match === crime.id) {
                setSelectedSignals(prevSignals => [...prevSignals, signal])
            }
        }); 
    }
    
    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1Ijoic2FtaGl0aGsiLCJhIjoiY2tpbGZiMGo0MDhnaDJ5cnVzazJuejUwYyJ9.R2M8OBHheODeWYlyu6JIYQ"
            mapStyle="mapbox://styles/mapbox/dark-v10"
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            <ReportSignalFab />
            {crimes.map((crime) => (
                <Marker key={crime.id} latitude={crime.coordinates[0]} longitude={crime.coordinates[1]} >
                    <IconButton color="secondary" disableFocusRipple={true} onClick={() => {
                        setSelectedSignals([]); 
                        highlightMarkings(crime);
                        setSelectedMarker(crime); 
                    }}>
                        <ErrorIcon style={crime.id === selectedCrime ? crimeMarkerStyle2 : crimeMarkerStyle} />
                    </IconButton>
                </Marker>
            ))}
            {signals.map((signal) => (
                <Marker key={signal.id} latitude={signal.coordinates[0]} longitude={signal.coordinates[1]}>
                    <IconButton color="primary" disableFocusRipple={true} onClick={() => {
                        setSelectedMarker(signal); 
                    }}>
                        <ErrorIcon style={selectedSignals.includes(signal) ? signalMarkerStyle2 : signalMarkerStyle} />
                    </IconButton>
                </Marker>
            ))}
            {selectedMarker ? (
                <Popup
                    latitude={selectedMarker.coordinates[0]}
                    longitude={selectedMarker.coordinates[1]}
                    onClose={() => {
                    setSelectedMarker(null);
                    }}
                >
                    <div>
                        <h2>{selectedMarker.description ? selectedMarker.description : ""}</h2>
                        <p>{selectedMarker.time}</p>
                    </div>
                </Popup>
            ) : null}
        </ReactMapGL>
    )
}

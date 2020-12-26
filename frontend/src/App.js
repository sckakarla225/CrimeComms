import React, { useState, useEffect } from 'react'; 
import './App.css';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

// COMPONENTS
import { Navbar, Nav } from 'react-bootstrap'; 
import { Map } from './components/Map'; 
import { LocationModal } from './components/LocationModal'; 
import { ReportCrimeModal } from './components/ReportCrimeModal';  
import { ReportSignalFab } from './components/ReportSignalFab'; 

// CONTEXT
import { CrimeContextProvider } from './context/CrimeContext'; 

function App() {
  const [locationModalShow, setLocationModalShow] = useState(true); 
  const [crimeModalShow, setCrimeModalShow] = useState(false);
  

  return (
    <CrimeContextProvider>
      <div className="App">
      <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            CrimeComms
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link onClick={() => setCrimeModalShow(true)}>REPORT A CRIME</Nav.Link>
                <Nav.Link>?</Nav.Link>
            </Nav>
        </Navbar>
        <LocationModal
          show={locationModalShow}
          onHide={() => setLocationModalShow(false)}
          backdrop="static"
          keyboard={false}
        />
        <ReportCrimeModal 
          show={crimeModalShow}
          onHide={() => setCrimeModalShow(false)}
        />
        <Map />
      </div>
    </CrimeContextProvider>
  );
}

export default App;

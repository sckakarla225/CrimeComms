import React, { useState, useContext } from 'react'; 
import '../App.css'; 

import Fab from '@material-ui/core/Fab';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import NavigationIcon from '@material-ui/icons/Navigation'; 
import ReportIcon from '@material-ui/icons/Report';
import { makeStyles } from '@material-ui/core/styles';
import { ReportSignalModal } from './ReportSignalModal'; 


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
      color: 'red', 
    },
}));

export const ReportSignalFab = () => {
    const [signalModalShow, setSignalModalShow] = useState(false); 
    const classes = useStyles(); 

    return (
        <div className={classes.root}>
            <Fab variant="extended" className="fab" onClick={() => {
              setSignalModalShow(true); 
              console.log("Click"); 
            }}>
                <ReportIcon className={classes.extendedIcon} />
                REPORT SIGNAL
            </Fab>
            <ReportSignalModal 
              show={signalModalShow}
              onHide={() => setSignalModalShow(false)}
            />
        </div>
    )
}

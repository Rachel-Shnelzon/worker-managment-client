// import AddWorker from "./addWorker";
import { Icon } from "@mui/material";
import AllWorkers from "./allWorkers";
import { Link, Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export default function Home() {

    return (
        <>
            <header style={{ backgroundColor: 'cream', padding: '10px' }}>
                <img src="../j.jpg" alt="Logo" style={{ height: '50px', width: '50px' }} />
                <h1 style={{ color: '#0b93b9', display: 'inline-block', marginLeft: '10px' }}>Workers Management</h1>
            </header>
            {/* <Login></Login> */}
            <br></br>
            <AllWorkers></AllWorkers>
            <Outlet />


        </>

    )

}
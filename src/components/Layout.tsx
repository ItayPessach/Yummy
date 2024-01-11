import { Outlet, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FastfoodIcon from '@mui/icons-material/Fastfood';

function Layout() {
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar >
                    <FastfoodIcon sx={{color: 'white' }} />
                    <Typography variant="h6" component="div" color={'white'} ml={1}>Yummy</Typography>
                    <Link to='explore' style={{marginLeft: '32px'}} >
                        <Button sx={{color: 'white'}}>
                            <Typography variant="subtitle1" component="div" mt={0.75}>Explore</Typography>
                        </Button>
                    </Link>
                    <Link to='upload' style={{marginLeft: '32px'}}>
                        <Button sx={{color: 'white'}}>
                            <Typography variant="subtitle1" component="div" mt={0.75}>Upload</Typography>
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    )
}

export default Layout
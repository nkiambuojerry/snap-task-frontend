import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import UserIdentity from './UerIdentity';
import Logo from '../logo.png';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#f8bbd0',
});

const drawerWidth = 240;
const navItems = [{ key: '/', value: 'Home' }, { key: '/task-list', value: 'View Tasks' }, { key: '/add-task', value: 'Add Task' },];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [userCode, setUserCode] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const navigate = useNavigate()

    React.useEffect(() => {
        if(localStorage.getItem('userCode')){
            setUserCode(localStorage.getItem('userCode'))
        }
    }, [])

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <UserIdentity open={open} userCode={userCode} setOpen={setOpen} setUserCode={setUserCode} />
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <img src={Logo} alt='Logo here' style={{ width: '50px' }} />
            </IconButton>

            <Typography variant="h5" sx={{ my: 2, }} style={{ color: 'black', }}>
                Span Task
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <>

                        <ListItemButton key={item.value} onClick={() => navigate(item.key)}>
                            <ListItemIcon>
                                <ArrowForwardIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.value} />
                        </ListItemButton>
                    </>
                ))}
                <Button key='User' variant="contained" sx={{ marginLeft: 2, margin: 2 }} onClick={() => setOpen(true)}>
                    Manage User
                </Button>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#f8bbd0' }}>
            <CssBaseline />
            <StyledAppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: 'black', fontWeight: 'bold' } }}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                        >
                            <img src={Logo} alt='Logo here' style={{ width: '50px' }} />
                        </IconButton>
                        Span Task
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.value} variant="contained" sx={{ marginLeft: 2, margin: 2 }} onClick={() => navigate(item.key)}>
                                {item.value}
                            </Button>
                        ))}
                        <Button key='User' variant="contained" sx={{ marginLeft: 2, margin: 2 }} onClick={() => setOpen(true)}>
                            Manage User 1
                        </Button>
                    </Box>
                </Toolbar>
            </StyledAppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

export default DrawerAppBar;

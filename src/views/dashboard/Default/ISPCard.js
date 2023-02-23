import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

// eslint-disable-next-line
const ISPCard = ({ isp, isLoading }) => {
    // eslint-disable-next-line
    const { name, vlan, color, totalUsers } = isp;

    const CardWrapper = styled(MainCard)(({ theme }) => ({
        backgroundColor: color,
        // backgroundColor: 'black',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: '#e1e0de',
            borderRadius: '50%',
            top: -85,
            right: -95,
            [theme.breakpoints.down('sm')]: {
                top: -105,
                right: -140
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: color,
            borderRadius: '50%',
            top: -155,
            right: -70,
            opacity: 0.5,
            [theme.breakpoints.down('sm')]: {
                top: -155,
                right: -70
            }
        }
    }));

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mb: 2 }}>{name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                backgroundColor: color,
                                                color: 'white',
                                                zIndex: 1
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>
                                        <Menu
                                            id="menu-earning-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: '1.2rem',
                                                fontWeight: 500,
                                                color: 'white'
                                            }}
                                        >
                                            VLAN: {vlan}
                                        </Typography>
                                    </Grid>
                                    <Grid item></Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25, mt: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: 'white'
                                    }}
                                >
                                    Total Users: {totalUsers}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

ISPCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ISPCard;

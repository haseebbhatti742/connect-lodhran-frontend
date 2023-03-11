import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonIspGrandSummaryCard from 'ui-component/cards/Skeleton/IspGrandSummaryCard';
import { THEME_COLOR_LIGHT } from 'utils/Constants';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const PartnerGrandSummaryCard = ({ isLoading, data }) => {
    const cardItem = { zIndex: 10 };
    const numberStyle = { fontSize: 24, fontWeight: 'bold' };
    const numberStyleRemaining = { fontSize: 30, fontWeight: 'bold', color: 'red' };
    const nameStyle = { fontSize: 30, fontWeight: 'bold' };
    const textStyle = { fontSize: 18 };
    const textStyleRemaining = { fontSize: 22, color: 'red' };

    const CardWrapper = styled(MainCard)(({ theme }) => ({
        backgroundColor: THEME_COLOR_LIGHT,
        // backgroundColor: 'black',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        myItem: {
            zIndex: 999
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: -30,
            right: -180
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
            borderRadius: '50%',
            top: -160,
            right: -130
        }
    }));

    return (
        <>
            {isLoading ? (
                <SkeletonIspGrandSummaryCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid item xs={12}>
                            <Typography sx={nameStyle}>{data?.fullname}</Typography>
                        </Grid>
                        <Grid container>
                            <Grid item sx={cardItem} xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography sx={numberStyle}>{data?.profit}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography style={textStyle}>Profit</Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={cardItem} xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography sx={numberStyle}>{data?.expense}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography style={textStyle}>Expense</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item sx={cardItem} xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography sx={numberStyleRemaining}>{data?.remainingProfit}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography style={textStyleRemaining}>Remaining</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

PartnerGrandSummaryCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PartnerGrandSummaryCard;

import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSupabase } from '../../context/SupabaseContext/SupabaseContext';
import { RouteNames } from '../../router';

export const NotFound = () => {
    const { session } = useSupabase();
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                height: '100vh',
                bgcolor: '#313335',
                textAlign: 'center',
            }}
        >
            <Box>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1,
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        color: 'rgba(255,255,255,0.8)',
                    }}
                >
                    Route Not Found
                </Typography>
            </Box>

            <Button
                variant="contained"
                component={RouterLink}
                to={session ? "/" : RouteNames.AUTH}
                sx={{
                    bgcolor: '#fff',
                    color: '#313335',
                    '&:hover': {
                        bgcolor: 'grey.100',
                    },
                }}
            >
                Go Home
            </Button>
        </Box>
    );
};

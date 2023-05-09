import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // main: '#1E1E1E',
      main: grey[900],
    },
    secondary: {
      main: '#3A64D8',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
      },
      variants: [
        {
          props: { color: 'primary' },
          style: {
            backgroundColor: 'rgba(0,0,0,0.0)',
            color: grey[900],
            ':hover': {
              backgroundColor: 'rgba(0,0,0,0.05)',
            },
          },
        },
        {
          props: { color: 'secondary' },
          style: {
            ':hover': {
              backgroundColor: '#274494',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: 'none',
          textTransform: 'none',
          transition: 'background-color 0.3s ease-in-out',
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        },
      },
    },
  },
});

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import { FileContext } from 'components/FileContext';
import AppLayout from 'components/AppLayout';

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
    typography: {
        useNextVariants: true
    }
});

export default class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <FileContext>
                    <AppLayout />
                </FileContext>
            </MuiThemeProvider>
        );
    }
}

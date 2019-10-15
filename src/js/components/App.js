import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { SnackbarProvider } from 'notistack';

import FileContextProvider from 'components/FileContext';
import AppLayout from 'components/AppLayout';

const theme = createMuiTheme({
    palette: {
        primary: blue
    }
});

export default class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <FileContextProvider>
                    <SnackbarProvider maxSnack={5}>
                        <AppLayout />
                    </SnackbarProvider>
                </FileContextProvider>
            </MuiThemeProvider>
        );
    }
}

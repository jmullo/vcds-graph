import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import App from 'components/App';

import 'fonts.css';
import 'vcds-graph.css';
import 'favicon.ico';

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
    typography: {
        useNextVariants: true
    }
});

const content = (
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
);

ReactDOM.render(content, document.getElementById('main'));

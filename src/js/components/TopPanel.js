import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AppName from 'components/AppName';
import FileImport from 'components/FileImport';
import FileChips from 'components/FileChips';

export default class TopPanel extends React.Component {

    render() {
        return (
            <Paper className="topPanel" elevation={4}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <AppName />
                    </Grid>
                    <Grid item>
                        <FileImport />
                    </Grid>
                    <FileChips />
                </Grid>
            </Paper>
        );
    }
}

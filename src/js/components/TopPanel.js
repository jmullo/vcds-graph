import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AppName from 'components/AppName';
import FileImport from 'components/FileImport';
import FileChips from 'components/FileChips';
import InfoButton from 'components/InfoButton';

export default class TopPanel extends React.Component {

    render() {
        return (
            <Paper className="topPanel" elevation={4}>
                <Grid container justify="flex-start" alignItems="center" spacing={1}>
                    <Grid item>
                        <AppName />
                    </Grid>
                    <Grid item>
                        <FileImport />
                    </Grid>
                    <Grid item sm>
                        <FileChips />
                    </Grid>
                    <Grid item>
                        <InfoButton />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

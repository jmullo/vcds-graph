import React from 'react';
import Grid from '@material-ui/core/Grid';

import AppName from 'components/AppName';
import FileImport from 'components/FileImport';
import FileChips from 'components/FileChips';

export default class TopPanel extends React.Component {

    render() {
        return (
            <Grid container alignItems="center" spacing={8}>
                <Grid item>
                    <AppName className="appName"/>
                </Grid>
                <Grid item>
                    <FileImport />
                </Grid>
                <FileChips />
            </Grid>
        );
    }
}

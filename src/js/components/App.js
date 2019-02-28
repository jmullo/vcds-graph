import _ from 'lodash';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FileHandler from 'components/FileHandler';

export default class App extends React.Component {
    state = {
        selectedFile: null
    }

    handleFileSelect = (selectedFile) => {
        this.setState({ selectedFile });
    }

    render() {
        const selectedFileName = _.get(this.state.selectedFile, 'name');

        return (
            <React.Fragment>
                <CssBaseline />

                <Grid className="grid" container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className="fileBar">
                            <FileHandler onChange={this.handleFileSelect}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper>
                            {selectedFileName}
                        </Paper>
                    </Grid>

                </Grid>
                
            </React.Fragment>
        );
    }
}

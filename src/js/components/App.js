import _ from 'lodash';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FileHandler from 'components/FileHandler';
import Graph from 'components/Graph';

export default class App extends React.Component {
    state = {
        selectedFile: null
    }

    handleFileSelect = (selectedFile) => {
        this.setState({ selectedFile });
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                
                <Grid className="grid" container alignItems="center" spacing={8}>
                    <Grid item xs={12}>
                        <Paper className="fileBar" elevation={1}>
                            <div className="appName">
                                <Typography variant="h6">
                                    vcds-graph
                                </Typography>
                            </div>
                            <div className="fileHandler">
                                <FileHandler onChange={this.handleFileSelect}/>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Graph file={this.state.selectedFile}/>
                    </Grid>

                </Grid>
                
            </React.Fragment>
        );
    }
}

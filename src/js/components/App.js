import _ from 'lodash';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AppInfo from 'components/AppInfo';
import AppBar from 'components/AppBar';
import Graph from 'components/Graph';
import DataTable from 'components/DataTable';

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
                <div className="grid">
                    <Grid container alignItems="center" spacing={8}>
                        <Grid item xs={12}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <AppBar onChange={this.handleFileSelect}/>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <AppInfo />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                        <Grid item className="resizable" xs={12}>
                            <Graph file={this.state.selectedFile}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DataTable file={this.state.selectedFile}/>
                        </Grid>
                    </Grid>
                </div>
                
            </React.Fragment>
        );
    }
}

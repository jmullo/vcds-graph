import _ from 'lodash';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TopPanelDetails from 'components/TopPanelDetails';
import { withFileContext } from 'components/FileContext';
import TopPanel from 'components/TopPanel';
import Graph from 'components/Graph';
import DataTable from 'components/DataTable';

class AppLayout extends React.Component {

    render() {
        return (
            <div className="grid">
                <Grid container alignItems="center" spacing={8}>
                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <TopPanel />
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <TopPanelDetails />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    {
                        this.props.fileContext.files.map((file) => (
                            <Grid item key={file.name} className="resizable" xs={12}>
                                <Graph file={file}/>
                            </Grid>
                        ))
                    }
                    {/*
                        <Grid item xs={12}>
                            <DataTable file={this.state.selectedFile}/>
                        </Grid>
                    */}
                </Grid>
            </div>
        );
    }
}

export default withFileContext(AppLayout);

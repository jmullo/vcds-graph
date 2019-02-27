import _ from 'lodash';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FileImport from 'components/FileImport';
import FileChips from 'components/FileChips';

export default class App extends React.Component {
    state = {
        files: [],
        selectedFileName: null
    }

    handleFileImport = (files) => {
        this.setState({
            files: [
                ...this.state.files,
                ...files
            ]
        });

        const selectedFileName = _.first(files).name;

        this.handleFileSelect(selectedFileName);
    }

    handleFileSelect = (selectedFileName) => {
        this.setState({ selectedFileName });
    }

    handleFileDelete = (name) => {
        const files = _.reject(this.state.files, ['name', name]);

        this.setState({ files });

        if (name === this.state.selectedFileName) {
            this.handleFileSelect(null);
        }
    }

    componentDidMount() {

    }

    render() {
        const fileNames = this.state.files.map(({name}) => (name));

        return (
            <React.Fragment>
                <CssBaseline />

                <Grid className="grid" container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className="fileBar">
                            <FileImport names={fileNames} onChange={this.handleFileImport}/>
                            <FileChips 
                                names={fileNames}
                                selected={this.state.selectedFileName}
                                onSelect={this.handleFileSelect}
                                onDelete={this.handleFileDelete}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper>
                            {this.state.selectedFileName}
                        </Paper>
                    </Grid>

                </Grid>
                
            </React.Fragment>
        );
    }
}

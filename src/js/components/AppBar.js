import React from 'react';
import Grid from '@material-ui/core/Grid';

import AppName from 'components/AppName';
import FileImport from 'components/FileImport';
import FileChips from 'components/FileChips';

export default class AppBar extends React.Component {
    state = {
        files: [],
        selectedFileName: null,
        importing: false
    }

    handleFileImport = (file) => {
        this.setState({
            files: [...this.state.files, file]
        }, () => this.handleFileSelect(file.name));
    }

    handleFileSelect = (selectedFileName) => {
        this.setState({ selectedFileName });
        
        const selectedFile = _.find(this.state.files, { name: selectedFileName });

        this.props.onChange(selectedFile);
    }

    handleFileDelete = (deletedFileName) => {
        const files = _.reject(this.state.files, ['name', deletedFileName]);

        this.setState({ files }, () => {
            if (deletedFileName === this.state.selectedFileName) {
                this.handleFileSelect();
            }
        });
    }

    render() {
        const fileNames = this.state.files.map(({name}) => (name));

        return (
            <Grid container alignItems="center" spacing={8}>
                <Grid item>
                    <AppName className="appName"/>
                </Grid>
                <Grid item>
                    <FileImport
                        names={fileNames}
                        onStart={() => this.setState({ importing: true })}
                        onComplete={() => this.setState({ importing: true })}
                        onChange={this.handleFileImport}/>
                </Grid>
                <FileChips 
                    names={fileNames}
                    selectedName={this.state.selectedFileName}
                    onSelect={this.handleFileSelect}
                    onDelete={this.handleFileDelete}/>
            </Grid>
        );
    }
}

import React from 'react';

import FileImport from 'components/FileImport';
import FileChips from 'components/FileChips';

export default class FileHandler extends React.Component {
    state = {
        files: [],
        selectedFileName: null
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
            <React.Fragment>
                <FileImport
                    names={fileNames}
                    onChange={this.handleFileImport}/>
                <FileChips 
                    names={fileNames}
                    selectedName={this.state.selectedFileName}
                    onSelect={this.handleFileSelect}
                    onDelete={this.handleFileDelete}/>
            </React.Fragment>
        );
    }
}

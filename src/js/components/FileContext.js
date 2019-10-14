import { reject } from 'lodash';
import React from 'react';

export const FileContext = React.createContext();

export default class FileContextProvider extends React.Component {
    state = {
        files: [],
        selectedFileName: null
    }

    addFile = (file) => {
        this.setState({
            files: [...this.state.files, file],
            selectedFileName: file.name
        });
    }

    removeFile = (fileName) => {
        const { files, selectedFileName } = this.state;
        const newSelectedFileName = (fileName === selectedFileName) ? null : selectedFileName;

        this.setState({
            files: reject(files, ['name', fileName]),
            selectedFileName: newSelectedFileName
        });
    }

    selectFile = (fileName) => {
        this.setState({ selectedFileName: fileName });
    }

    render() {
        const names = this.state.files.map(({ name }) => (name));

        return (
            <FileContext.Provider value={{
                files: this.state.files,
                fileNames: names,
                selectedFileName: this.state.selectedFileName,
                addFile: this.addFile,
                removeFile: this.removeFile,
                selectFile: this.selectFile
            }}>
                {this.props.children}
            </FileContext.Provider>
        );
    }
}

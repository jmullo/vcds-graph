import { get, reject } from 'lodash';
import React from 'react';
import { withSnackbar } from 'notistack';

import { UNABLE_TO_IMPORT } from 'constants/messages';

export const FileContext = React.createContext();

class FileContextProvider extends React.Component {

    state = {
        files: [],
        selectedFileName: null,
        lastAddedFileName: null
    }

    addFile = (file) => {
        this.setState({
            files: [...this.state.files, file],
            selectedFileName: file.name,
            lastAddedFileName: file.name
        });
    }

    removeFile = (fileName) => {
        const { files, selectedFileName } = this.state;
        const newFiles = reject(files, ['name', fileName]);
        
        const newSelectedFileName = (fileName === selectedFileName)
                                  ? get(newFiles, ['0', 'name'], null)
                                  : selectedFileName;

        this.setState({
            files: newFiles,
            selectedFileName: newSelectedFileName
        });
    }

    removeInvalidFile = () => {
        this.props.enqueueSnackbar(UNABLE_TO_IMPORT(this.state.lastAddedFileName), {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                autoHideDuration: 5000
            }
        });

        this.removeFile(this.state.lastAddedFileName);
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
                removeInvalidFile: this.removeInvalidFile,
                selectFile: this.selectFile
            }}>
                {this.props.children}
            </FileContext.Provider>
        );
    }
}

export default withSnackbar(FileContextProvider);

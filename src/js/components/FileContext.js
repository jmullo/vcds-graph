import { reject } from 'lodash';
import React from 'react';
import { withSnackbar } from 'notistack';

export const FileContext = React.createContext();

class FileContextProvider extends React.Component {

    state = {
        files: [],
        selectedFileName: null
    }

    lastAddedFileName = null;

    addFile = (file) => {
        this.lastAddedFileName = file.name;

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

    removeInvalidFile = () => {
        this.props.enqueueSnackbar(`Unable to import "${this.lastAddedFileName}". Try another log file or contact: jussi.mullo@iki.fi`, {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                autoHideDuration: 5000
            }
        });

        this.removeFile(this.lastAddedFileName);
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

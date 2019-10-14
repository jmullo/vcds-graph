import React from 'react';

const Context = React.createContext();

export class FileContext extends React.Component {
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
            files: _.reject(files, ['name', fileName]),
            selectedFileName: newSelectedFileName
        });
    }

    selectFile = (fileName) => {
        this.setState({ selectedFileName: fileName });
    }

    render() {
        const names = this.state.files.map(({name}) => (name));

        return (
            <Context.Provider value={{
                files: this.state.files,
                fileNames: names,
                selectedFileName: this.state.selectedFileName,
                addFile: this.addFile,
                removeFile: this.removeFile,
                selectFile: this.selectFile
            }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export function withFileContext(Component) {
    return function WrapperComponent(props) {
        return (
            <Context.Consumer>
                {
                    (context) => <Component {...props} fileContext={context}/>
                }
            </Context.Consumer>
        );
    };
}

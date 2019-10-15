import React from 'react';
import Grid from '@material-ui/core/Grid';

import { FileContext } from 'components/FileContext';
import TopPanel from 'components/TopPanel';
import Graph from 'components/Graph';

class AppLayout extends React.Component {

    render() {
        return (
            <Grid container className="grid" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <TopPanel />
                </Grid>
                {
                    this.context.files.map((file) => (
                        <Grid item key={file.name} className="resizable" xs={12}>
                            <Graph file={file}/>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}

AppLayout.contextType = FileContext;

export default AppLayout;

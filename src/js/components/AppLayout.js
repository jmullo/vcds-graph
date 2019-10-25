import React from 'react';
import Grid from '@material-ui/core/Grid';

import { FileContext } from 'components/FileContext';
import TopPanel from 'components/TopPanel';
import Graph from 'components/Graph';
import DataTable from 'components/DataTable';

class AppLayout extends React.Component {

    render() {
        return (
            <Grid container className="grid" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <TopPanel />
                </Grid>
                {
                    this.context.files.map((file) => (
                        <Grid item key={file.name} xs={12} className="gridItem">
                            <div className="resizable">
                                <Graph file={file}/>
                            </div>
                            <div className="tableDiv">
                                <DataTable file={file}/>
                            </div>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}

AppLayout.contextType = FileContext;

export default AppLayout;

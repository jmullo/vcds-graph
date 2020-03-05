import React from 'react';
import Grid from '@material-ui/core/Grid';

import { FileContext } from 'components/FileContext';
import TopPanel from 'components/TopPanel';
import Graph from 'components/Graph';
import DataTable from 'components/DataTable';

class AppLayout extends React.Component {

    render() {
        const multipleMeasurements = this.context.files.length > 1 ? true : false;

        return (
            <Grid container className="grid" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <TopPanel />
                </Grid>
                {
                    this.context.files.map((file) => (
                        <Grid item key={file.name} xs={12} className="gridItem">
                            <div className="resizable">
                                <Graph file={file} selected={file.name === this.context.selectedFileName} />
                            </div>
                            <div className="tableDiv">
                                <DataTable file={file} limitedHeight={multipleMeasurements} />
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

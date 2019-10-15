import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

export default class InfoButton extends React.Component {

    state = {
        dialogOpen: false
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleClick = () => {
        this.setState({ dialogOpen: true });
    };

    render() {
        return (
            <div className="dialog">
                {
                    this.state.dialogOpen &&
                    <Dialog className="dialog" open={this.state.dialogOpen} onClose={this.handleClose}>

                        <div className="infoDialog">
                            <Grid container spacing={2} direction="column" alignItems="flex-start">
                                <Grid item>
                                    <Typography variant="body1">
                                        VCDS:&nbsp;
                                        <Link
                                            color="secondary"
                                            variant="body1"
                                            href="https://www.ross-tech.com/vcds/tour/logging.php">
                                            Ross-Tech
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Graph:&nbsp;
                                        <Link
                                            color="secondary"
                                            variant="body1"
                                            href="https://www.highcharts.com/">
                                            Highcharts
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    &nbsp;
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Code:&nbsp;
                                        <Link
                                            color="secondary"
                                            variant="body1"
                                            href="https://github.com/jmullo/bussit">
                                            https://github.com/jmullo/bussit
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Contact:&nbsp;
                                        <Link
                                            color="secondary"
                                            variant="body1"
                                            href="mailto:jussi.mullo@iki.fi">
                                            jussi.mullo@iki.fi
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Dialog>
                }
                <IconButton className="infoButton" color="primary" onClick={this.handleClick}>
                    <InfoOutlined fontSize="large" />
                </IconButton>
            </div>
        );
    }
}

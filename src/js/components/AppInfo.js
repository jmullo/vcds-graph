import React from 'react';

import Link from '@material-ui/core/Link';
import Octicon, { MarkGithub, Mail } from '@githubprimer/octicons-react'

export default class AppInfo extends React.Component {

    render() {
        return (
            <div>
                <Link className="link" href="https://github.com/jmullo/vcds-graph" color="secondary" variant="body1">
                    <Octicon className="icon" icon={MarkGithub} size='medium' verticalAlign='middle'/>
                    jmullo/vcds-graph
                </Link>
                <Link href="mailto:jussi.mullo@iki.fi" color="secondary" variant="body1">
                    <Octicon className="icon" icon={Mail} size='medium' verticalAlign='middle'/>
                    jussi.mullo@iki.fi
                </Link>
            </div>
        );
    }
}

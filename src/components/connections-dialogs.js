import React, { Fragment } from 'react';
import ErrorConnectionDialog from './error-connection-dialog';
import LoadingDialog from './loading-dialog';

function ConnectionsDialogs({ onLoading, onError, onCancel, onRetry }) {
    
    return (
        <Fragment>
            <LoadingDialog visible={onLoading} />
            <ErrorConnectionDialog
                visible={onError}
                onCancel={onCancel}
                onRetry={onRetry} />
        </Fragment>
    );
}

export default ConnectionsDialogs;
import React from 'react';

import { Loading } from '@folio/stripes/components';

const centered = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const LoadingCentered = props => (
  <div style={centered}>
    <Loading size="xlarge" {...props} />
  </div>
);

LoadingCentered.propTypes = Loading.propTypes;

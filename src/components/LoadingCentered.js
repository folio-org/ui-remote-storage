import React from 'react';

import { Loading } from '@folio/stripes/components';

import { Centered } from './Centered';

export const LoadingCentered = props => (
  <Centered>
    <Loading size="xlarge" {...props} />
  </Centered>
);

LoadingCentered.propTypes = Loading.propTypes;

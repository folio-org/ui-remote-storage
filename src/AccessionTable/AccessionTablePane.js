import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';

import { Configurations } from '../API';
import { LoadingCentered, ErrorCentered } from '../components';
import AccessionTableContent from './AccessionTableContent';

const AccessionTablePane = () => {
  const query = Configurations.useListQuery();

  return (
    <Pane
      defaultWidth="fill"
      paneTitle={<FormattedMessage id="ui-remote-storage.accession-tables.title" />}
    >
      {query.isLoading && <LoadingCentered />}
      {query.isError && <ErrorCentered />}
      {query.isSuccess && <AccessionTableContent configurations={query.configurations} />}
    </Pane>
  );
};

export default AccessionTablePane;

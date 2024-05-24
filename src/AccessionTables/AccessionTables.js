import { FormattedMessage, useIntl } from 'react-intl';

import { Pane } from '@folio/stripes/components';

import { LoadingCentered, ErrorCentered } from '../components';
import { Content } from './Content';
import { useCaiaSoftConfigurations } from './useCaiaSoftConfigurations';
import { NoConfigurations } from './NoConfigurations';
import { TitleManager } from '@folio/stripes/core';

export const AccessionTables = () => {
  const query = useCaiaSoftConfigurations();
  const intl = useIntl();

  return (
    <TitleManager
      record={intl.formatMessage({ id: 'ui-remote-storage.accession-tables.title' })}
    >
      <Pane
        defaultWidth="fill"
        paneTitle={<FormattedMessage id="ui-remote-storage.accession-tables.title" />}
      >
        {query.isLoading && <LoadingCentered />}
        {query.isError && <ErrorCentered />}
        {query.isSuccess && query.configurations.length ? <Content /> : <NoConfigurations />}
      </Pane>
    </TitleManager>
  );
};

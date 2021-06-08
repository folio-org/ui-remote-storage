import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';

import { LoadingCentered, ErrorCentered } from '../components';
import { Content } from './Content';
import { useCaiaSoftConfigurations } from './useCaiaSoftConfigurations';
import { NoConfigurations } from './NoConfigurations';

export const AccessionTables = () => {
  const query = useCaiaSoftConfigurations();

  return (
    <Pane
      defaultWidth="fill"
      paneTitle={<FormattedMessage id="ui-remote-storage.accession-tables.title" />}
    >
      {query.isLoading && <LoadingCentered />}
      {query.isError && <ErrorCentered />}
      {query.isSuccess && query.configurations.length ? <Content /> : <NoConfigurations />}
    </Pane>
  );
};

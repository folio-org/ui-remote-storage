import { FormattedMessage, FormattedDate } from 'react-intl';

import { MultiColumnList } from '@folio/stripes/components';
import { useShowCallout } from '@folio/stripes-acq-components';

import { Configurations, Providers } from '../../data';
import { ErrorCentered, LoadingCentered } from '../../components';

const visibleColumns = ['name', 'providerName', 'lastUpdate'];
const columnMapping = {
  name: <FormattedMessage id="ui-remote-storage.list.name" />,
  providerName: <FormattedMessage id="ui-remote-storage.list.providerName" />,
  lastUpdate: <FormattedMessage id="ui-remote-storage.list.lastUpdate" />,
};

export const List = props => {
  const showCallout = useShowCallout();

  const query = Configurations.useListQuery();

  const { map } = Providers.useMap({
    onError: () => showCallout({ messageId: 'ui-remote-storage.error', type: 'error' }),
  });

  const formatter = {
    providerName: item => map[item.providerName],
    lastUpdate: item => (
      <FormattedDate
        value={item.metadata.updatedDate || item.metadata.createdDate}
        timeZone="UTC"
        year="numeric"
        month="2-digit"
        day="2-digit"
      />
    ),
  };

  if (query.isLoading) return <LoadingCentered />;

  if (query.isError) return <ErrorCentered />;

  return (
    <MultiColumnList
      id="storages-list"
      contentData={query.configurations}
      visibleColumns={visibleColumns}
      columnMapping={columnMapping}
      formatter={formatter}
      autosize
      {...props}
    />
  );
};

List.propTypes = MultiColumnList.propTypes;

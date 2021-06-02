import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import moment from 'moment';

import { useStripes } from '@folio/stripes/core';
import { MultiColumnList } from '@folio/stripes/components';

import { Configurations } from '../../API';
import { ErrorCentered, LoadingCentered } from '../../components';


const visibleColumns = ['name', 'providerName', 'lastUpdate'];
const columnMapping = {
  name: <FormattedMessage id="ui-remote-storage.list.name" />,
  providerName: <FormattedMessage id="ui-remote-storage.list.providerName" />,
  lastUpdate: <FormattedMessage id="ui-remote-storage.list.lastUpdate" />,
};


export const List = props => {
  const intl = useIntl();
  const stripes = useStripes();

  const query = Configurations.useListQuery();

  const localeDateFormat = useMemo(
    () => moment.localeData(stripes.locale).longDateFormat('L'),
    [stripes.locale],
  );

  const formatter = {
    providerName: item => intl.formatMessage({ id: `ui-remote-storage.name.${item.providerName}` }),
    lastUpdate: item => moment
      .utc(item.metadata.updatedDate || item.metadata.createdDate)
      .format(localeDateFormat),
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

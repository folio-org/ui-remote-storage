import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useStripes } from '@folio/stripes/core';
import { MultiColumnList } from '@folio/stripes/components';

import { Configurations } from '../../data';
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

  const getFormattedLastUpdate = (value, locale) => Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(value);


  const formatter = {
    providerName: item => intl.formatMessage({ id: `ui-remote-storage.name.${item.providerName}` }),
    lastUpdate: item => getFormattedLastUpdate(
      new Date(item.metadata.updatedDate || item.metadata.createdDate),
      stripes.locale,
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

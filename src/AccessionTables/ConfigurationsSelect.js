import React from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { Select } from '@folio/stripes-acq-components';

import { Configurations } from '../API';

export const ConfigurationsSelect = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const query = Configurations.useListQuery();

  const dataOptions = query.configurations.map(({ id, name }) => ({ value: id, label: name }));

  const selectConfig = ({ target }) => {
    history.push(`${match.path}/${target.value}`);
  };

  return (
    <Select
      required
      dataOptions={dataOptions}
      defaultValue={match.params.id}
      onChange={selectConfig}
    />
  );
};

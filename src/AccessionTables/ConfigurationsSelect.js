import React from 'react';
import escapeRegExp from 'lodash/escapeRegExp';

import { Selection } from '@folio/stripes-acq-components';

import { useCaiaSoftConfigurations } from './useCaiaSoftConfigurations';

const filter = (value, data) => {
  return data.filter(o => new RegExp(escapeRegExp(value), 'i').test(o.label));
};


export const ConfigurationsSelect = props => {
  const query = useCaiaSoftConfigurations();
  const dataOptions = query.configurations.map(({ id, name }) => ({ value: id, label: name }));

  return (
    <Selection
      dataOptions={dataOptions}
      onFilter={filter}
      {...props}
    />
  );
};

ConfigurationsSelect.propTypes = Selection.propTypes;

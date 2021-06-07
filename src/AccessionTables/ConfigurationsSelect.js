import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import { Select } from '@folio/stripes-acq-components';

export const ConfigurationsSelect = ({ onSelectConfig, caiasoftConfigurations }) => {
  const params = useParams();

  const dataOptions = caiasoftConfigurations.map(({ id, name }) => ({ value: id, label: name }));

  return (
    <Select
      required
      dataOptions={dataOptions}
      defaultValue={params.id}
      onChange={onSelectConfig}
    />
  );
};

ConfigurationsSelect.propTypes = {
  onSelectConfig: PropTypes.func.isRequired,
  caiasoftConfigurations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

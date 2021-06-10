import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { EditableList } from '@folio/stripes/smart-components';

import { LoadingCentered } from '../components';
import { AccessionTable as AT } from '../API';
import { Locations, AccessionTable } from '../data';
import { Location, LocationSelection } from './components';


// todo: make translations
const columnMapping = {
  originalLocationId: 'from',
  finalLocationId: 'to',
};


// todo: propTypes
// eslint-disable-next-line react/prop-types
const LocationField = ({ name, configurationId, ...props }) => {
  const { locations } = Locations.useByConfigurationId(configurationId);

  return <Field name={name} component={LocationSelection} locations={locations} {...props} />;
};


// todo: guard editing with permissions
export const Table = ({ configurationId }) => {
  const { rows } = AccessionTable.useByConfigurationId(configurationId);
  const { map: locationsMap } = Locations.useMap();
  const { mutate: update } = AT.useCreateOrUpdateMutation();

  const handleEdit = item => {
    const json = {
      ...item,
      remoteConfigurationId: configurationId,
    };

    return update(json);
  };

  return (
    <EditableList
      contentData={rows}
      uniqueField="originalLocationId" // todo: file a bug in EditableList - ignored for choosing of onCreate, onUpdate
      isEmptyMessage={<LoadingCentered />}
      canCreate={false} // does not really help with "Create" button, just disables it
      actionProps={{
        create: () => ({ style: { display: 'none' } }), // to get rid of "Create" button
      }}
      readOnlyFields={['originalLocationId']}
      visibleFields={['originalLocationId', 'finalLocationId']}
      actionSuppression={{ delete: () => true, edit: () => false }}
      columnMapping={columnMapping}
      fieldComponents={{
        finalLocationId: item => (
          <LocationField
            {...item.fieldProps}
            configurationId={configurationId}
            marginBottom0
          />
        ),
      }}
      formatter={{
        originalLocationId: item => <Location location={locationsMap[item.originalLocationId]} />,
        finalLocationId: item => <Location location={locationsMap[item.finalLocationId]} />,
      }}
      onCreate={handleEdit}
      onUpdate={handleEdit} // only onCreate is really used because of bug with `id` in EditableList
      validate={() => {}} // because it's required to be a function
    />
  );
};

Table.propTypes = {
  configurationId: PropTypes.string.isRequired,
};


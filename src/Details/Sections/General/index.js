import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field, useFormState } from 'react-final-form';

import {
  Accordion,
  Col,
  Row,
} from '@folio/stripes/components';
import {
  ViewMetaData,
} from '@folio/stripes/smart-components';
import {
  TextField,
} from '@folio/stripes-acq-components';

import {
  DEMATIC_SD,
  CAIASOFT,
} from '../../../const';
import { Providers } from './Providers';

export const General = ({ isNonInteractive }) => {
  const intl = useIntl();
  const { values, initialValues } = useFormState();

  const isDematicSD = values.providerName === DEMATIC_SD;
  const isCaiasoft = values.providerName === CAIASOFT;

  const labels = {
    storageNameLabel: intl.formatMessage({ id: 'ui-remote-storage.details.name' }),
    urlLabel: intl.formatMessage({ id: 'ui-remote-storage.details.url' }),
    statusUrlLabel: intl.formatMessage({ id: 'ui-remote-storage.details.statusUrl' }),
    credPropertiesLabel: intl.formatMessage({ id: 'ui-remote-storage.details.credProperties' }),
  };

  return (
    <Accordion label={intl.formatMessage({ id: 'ui-remote-storage.details.title' })}>
      {initialValues?.metadata && <ViewMetaData metadata={initialValues.metadata} />}
      <Row>
        <Col xs={8}>
          <Field
            component={TextField}
            area-label={labels.storageNameLabel}
            label={labels.storageNameLabel}
            name="name"
            isNonInteractive={isNonInteractive}
            required
            validate={value => !(value?.trim().length > 0) &&
              intl.formatMessage({ id: 'ui-remote-storage.details.name.error' })
            }
            autoFocus
          />
        </Col>
        <Col xs={4}>
          <Providers isNonInteractive={isNonInteractive} />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            area-label={labels.urlLabel}
            label={labels.urlLabel}
            name="url"
            isNonInteractive={isNonInteractive}
          />
        </Col>
        <Col xs={6}>
          {isDematicSD && (
            <Field
              component={TextField}
              area-label={labels.statusUrlLabel}
              label={labels.statusUrlLabel}
              name="statusUrl"
              isNonInteractive={isNonInteractive}
            />
          )}
          {isCaiasoft && (
            <Field
              component={TextField}
              area-label={labels.credPropertiesLabel}
              label={labels.credPropertiesLabel}
              name="apiKey"
              isNonInteractive={isNonInteractive}
            />
          )}
        </Col>
      </Row>
    </Accordion>
  );
};

General.propTypes = {
  isNonInteractive: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field, useFormState } from 'react-final-form';

import {
  Accordion,
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';
import {
  TextField,
  Select,
} from '@folio/stripes-acq-components';

import { TIME_UNITS } from '../../../const';

export const Synchronization = ({ isNonInteractive }) => {
  const intl = useIntl();
  const { values } = useFormState();

  return (
    <Accordion label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.title' })}>
      <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.schedule.title' })}>
        {isNonInteractive
          ? intl.formatMessage(
            { id: 'ui-remote-storage.synchronization.schedule.info' },
            {
              delay: values.accessionDelay,
              unit: values.accessionTimeUnit,
            },
          )
          : (
            <Row>
              <Col xsOffset={0}>
                <KeyValue>
                  {intl.formatMessage(
                    {
                      id: 'ui-remote-storage.synchronization.schedule.info',
                    },
                    {
                      delay: '',
                      unit: '',
                    },
                  )}
                </KeyValue>
              </Col>
              <Col xs={1}>
                <Field
                  component={TextField}
                  type="number"
                  name="accessionDelay"
                  hasClearIcon={false}
                  isNonInteractive={isNonInteractive}
                />
              </Col>
              <Col xs={2}>
                <Field
                  component={Select}
                  name="accessionTimeUnit"
                  dataOptions={TIME_UNITS}
                  defaultValue={TIME_UNITS[0].value}
                  isNonInteractive={isNonInteractive}
                />
              </Col>
            </Row>
          )
        }
      </KeyValue>
    </Accordion>
  );
};

Synchronization.propTypes = {
  isNonInteractive: PropTypes.bool.isRequired,
};

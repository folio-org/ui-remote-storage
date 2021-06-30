import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import NumberFormat from 'react-number-format';

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

const formatInteger = string => {
  const integerAccept = /[^0-]\d*/g;
  const parsed = (string?.match(integerAccept) || []).join('');
  const number = Number.parseInt(parsed, 10);

  if (Number.isNaN(number)) {
    return '';
  }

  return number;
};


export const Synchronization = ({ isNonInteractive }) => {
  const intl = useIntl();
  const { values } = useFormState();

  const TIME_UNITS = [
    { label: intl.formatMessage({ id: 'ui-remote-storage.minutes' }), value: 'minutes' },
    { label: intl.formatMessage({ id: 'ui-remote-storage.hours' }), value: 'hours' },
    { label: intl.formatMessage({ id: 'ui-remote-storage.days' }), value: 'days' },
    { label: intl.formatMessage({ id: 'ui-remote-storage.weeks' }), value: 'weeks' },
    { label: intl.formatMessage({ id: 'ui-remote-storage.months' }), value: 'months' },
  ];

  return (
    <Accordion label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.title' })}>
      <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.schedule.title' })}>
        {isNonInteractive
          ? values.accessionDelay
            ? intl.formatMessage(
              { id: `ui-remote-storage.synchronization.schedule.info.${values.accessionTimeUnit}` },
              {
                delay: values.accessionDelay,
              },
            )
            : intl.formatMessage({ id: 'ui-remote-storage.synchronization.schedule.info.notSet' })
          : (
            <Row>
              <Col xsOffset={0}>
                <KeyValue>
                  {intl.formatMessage({ id: 'ui-remote-storage.synchronization.schedule.info' })}
                </KeyValue>
              </Col>
              <Col xs={1}>
                <Field
                  component={TextField}
                  type="number"
                  name="accessionDelay"
                  format={formatInteger}
                  hasClearIcon={false}
                  min={1}
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

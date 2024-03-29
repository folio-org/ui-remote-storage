import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Pane, Row, Col } from '@folio/stripes/components';
import { FormFooter } from '@folio/stripes-acq-components';
import stripesFinalForm from '@folio/stripes/final-form';

import { LoadingCentered } from '../../components';
import { Fields } from '../Fields';

const FormComponent = ({ pristine, submitting, onClose, handleSubmit, title, isLoading }) => {
  const intl = useIntl();

  const paneFooter = useMemo(() => (
    <FormFooter
      label={intl.formatMessage({ id: 'stripes-components.saveAndClose' })}
      handleSubmit={handleSubmit}
      pristine={pristine}
      submitting={submitting}
      onCancel={onClose}
    />
  ), [intl, handleSubmit, pristine, submitting, onClose]);

  return (
    <Pane
      defaultWidth="fill"
      paneTitle={title}
      footer={paneFooter}
      onClose={onClose}
      dismissible
    >
      {isLoading
        ? <LoadingCentered />
        : (
          <Row center="xs" style={{ textAlign: 'unset' }}>
            <Col xs={12} sm={10} md={8} lg={6}>
              <form noValidate>{/* `noValidate` to prevent browser native tooltips for required fields */}
                <Fields />
              </form>
            </Col>
          </Row>
        )
      }
    </Pane>
  );
};

FormComponent.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,

  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

export const TheForm = stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(FormComponent);

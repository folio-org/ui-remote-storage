import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Pane,
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Row,
  KeyValue,
  TextField,
  Select,
} from '@folio/stripes/components';
import {
  ViewMetaData,
} from '@folio/stripes/smart-components';
import {
  useAccordionToggle,
  FormFooter,
} from '@folio/stripes-acq-components';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  SECTIONS_STORAGE,
  TIME_UNITS,
  DEMATIC_SD,
  CAIASOFT,
} from '../const';

const FormComponent = ({
  initialValues,
  providers,
  pristine,
  submitting,
  onClose,
  handleSubmit,
  values,
  title,
}) => {
  const intl = useIntl();

  const [expandAll, sections, toggleSection] = useAccordionToggle(
    Object.values(SECTIONS_STORAGE).reduce((acc, k) => {
      acc[k] = true;

      return acc;
    }, {}),
  );

  const paneFooter = useMemo(() => (
    <FormFooter
      label={intl.formatMessage({ id: 'ui-remote-storage.saveAndClose' })}
      handleSubmit={handleSubmit}
      pristine={pristine}
      submitting={submitting}
      onCancel={onClose}
    />
  ), [intl, handleSubmit, pristine, submitting, onClose]);

  const isDematicSD = values.providerName === DEMATIC_SD;
  const isCaiasoft = values.providerName === CAIASOFT;

  const labels = {
    storageNameLabel: intl.formatMessage({ id: 'ui-remote-storage.details.storageName' }),
    providerNameLabel: intl.formatMessage({ id: 'ui-remote-storage.details.providerName' }),
    urlLabel: intl.formatMessage({ id: 'ui-remote-storage.details.url' }),
    statusUrlLabel: intl.formatMessage({ id: 'ui-remote-storage.details.statusUrl' }),
    credPropertiesLabel: intl.formatMessage({ id: 'ui-remote-storage.details.credProperties' }),
  };

  return (
    <form style={{ height: '100vh' }}>
      <Pane
        defaultWidth="fill"
        paneTitle={title}
        footer={paneFooter}
        onClose={onClose}
        dismissible
      >
        <Row>
          <Col
            xs={12}
            md={8}
            mdOffset={2}
          >
            <Row end="xs">
              <Col xs={12}>
                <ExpandAllButton
                  accordionStatus={sections}
                  onToggle={expandAll}
                />
              </Col>
            </Row>

            <AccordionSet
              accordionStatus={sections}
              onToggle={toggleSection}
            >
              <Accordion
                label={intl.formatMessage({ id: 'ui-remote-storage.details.title' })}
                id={SECTIONS_STORAGE.INFORMATION}
              >
                {initialValues?.metadata && <ViewMetaData metadata={initialValues.metadata} />}
                <Row>
                  <Col xs={3}>
                    <Field
                      component={TextField}
                      area-label={labels.storageNameLabel}
                      label={labels.storageNameLabel}
                      name="name"
                    />
                  </Col>
                  <Col xs={3}>
                    <Field
                      component={Select}
                      area-label={labels.providerNameLabel}
                      label={labels.providerNameLabel}
                      name="providerName"
                      dataOptions={providers}
                      defaultValue={providers[0]?.value}
                    />
                  </Col>
                  <Col xs={4}>
                    <Field
                      component={TextField}
                      area-label={labels.urlLabel}
                      label={labels.urlLabel}
                      name="url"
                    />
                  </Col>
                  {isDematicSD && (
                  <Col xs={4}>
                    <Field
                      component={TextField}
                      area-label={labels.statusUrlLabel}
                      label={labels.statusUrlLabel}
                      name="statusUrl"
                    />
                  </Col>
                  )}
                  {isCaiasoft && (
                  <Col xs={4}>
                    <Field
                      component={TextField}
                      area-label={labels.credPropertiesLabel}
                      label={labels.credPropertiesLabel}
                      name="apiKey"
                    />
                  </Col>
                  )}
                </Row>
              </Accordion>

              <Accordion
                label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.title' })}
                id={SECTIONS_STORAGE.SYNCHRONIZATION}
              >
                <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.schedule.title' })}>
                  <Row>
                    <Col xsOffset={0}>
                      {intl.formatMessage(
                        {
                          id: 'ui-remote-storage.synchronization.schedule.info',
                        },
                        {
                          delay: '',
                          unit: '',
                        },
                      )}
                    </Col>
                    <Col xs={1}>
                      <Field
                        component={TextField}
                        type="number"
                        name="accessionDelay"
                        hasClearIcon={false}
                      />
                    </Col>
                    <Col xs={2}>
                      <Field
                        component={Select}
                        name="accessionTimeUnit"
                        dataOptions={TIME_UNITS}
                        defaultValue={TIME_UNITS[0].value}
                      />
                    </Col>
                  </Row>
                </KeyValue>
              </Accordion>
            </AccordionSet>
          </Col>
        </Row>
      </Pane>
    </form>
  );
};

FormComponent.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func.isRequired,

  initialValues: PropTypes.object,
  values: PropTypes.object,
  providers: PropTypes.arrayOf(PropTypes.object),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

export const TheForm = stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(FormComponent);

import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field, FormSpy } from 'react-final-form';

import {
  Pane,
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  LoadingPane,
  Row,
  KeyValue,
  Layer,
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
} from '../const';

const spySubscription = { values: true };

const RemoteStorageForm = ({
  initialValues,
  providers,
  isLoading,
  pristine,
  submitting,
  onClose,
  handleSubmit,
}) => {
  const intl = useIntl();

  const [isDematicSD, setIsDematicSD] = useState();
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

  const changeProvider = useCallback(({ values }) => {
    if (values?.providerName === 'DEMATIC_SD') {
      setIsDematicSD(true);
    } else {
      setIsDematicSD(false);
      delete values.statusUrl;
    }
  }, []);

  if (isLoading) {
    return <LoadingPane />;
  }

  const labels = {
    storageNameLabel: intl.formatMessage({ id: 'ui-remote-storage.details.storageName' }),
    providerNameLabel: intl.formatMessage({ id: 'ui-remote-storage.details.providerName' }),
    urlLabel: intl.formatMessage({ id: 'ui-remote-storage.details.url' }),
    statusUrlLabel: intl.formatMessage({ id: 'ui-remote-storage.details.statusUrl' }),
  };

  const paneTitle = initialValues
    ? intl.formatMessage(
      { id: 'ui-remote-storage.editForm.title' },
      { name: initialValues.name },
    )
    : intl.formatMessage({ id: 'ui-remote-storage.createForm.title' });

  return (
    <Layer
      isOpen
      contentLabel="Edit configuration"
    >
      <form style={{ height: '100vh' }}>
        <Pane
          paneTitle={paneTitle}
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
                  </Row>
                </Accordion>

                <Accordion
                  label={intl.formatMessage({ id: 'ui-remote-storage.accession.title' })}
                  id={SECTIONS_STORAGE.ACCESSION}
                >
                  <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.accession.schedule.title' })}>
                    <Row>
                      <Col xsOffset={0}>
                        {intl.formatMessage(
                          {
                            id: 'ui-remote-storage.accession.schedule.info',
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

                <Accordion
                  label={intl.formatMessage({ id: 'ui-remote-storage.retrieval.title' })}
                  id={SECTIONS_STORAGE.RETRIEVAL}
                />
              </AccordionSet>
            </Col>
          </Row>
        </Pane>
      </form>
      <FormSpy
        subscription={spySubscription}
        onChange={changeProvider}
      />
    </Layer>
  );
};

RemoteStorageForm.propTypes = {
  initialValues: PropTypes.object,
  providers: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(RemoteStorageForm);

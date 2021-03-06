import React, {PropTypes} from "react";
import {Field, Form, SubmissionError} from "redux-form";
import moment from "moment";
import {maskedInvalid, trimmedEmpty} from "../../util/ValidationUtil";
import {Button, ButtonToolbar, Glyphicon, Row} from "react-bootstrap";
import Input from "./form/Input.jsx";
import MaskedInput from "./form/MaskedInput.jsx";
import InputArea from "./form/InputArea.jsx";

class PatientForm extends React.Component {

  constructor(props) {
    super(props);
  }

  validate(patient) {
    const {t} = this.props;
    let errors = {};
    let errorExist = false;
    if (maskedInvalid(patient.personalId)) {
      errors.personalId = t('Enter a valid personal id.');
      errorExist = true;
    }
    if (maskedInvalid(patient.birthDate) || !moment(patient.birthDate).isValid()
      || moment().diff(moment(patient.birthDate), 'years') > 100) {
      errors.birthDate = t('Enter a valid birth date.');
      errorExist = true;
    }

    if (trimmedEmpty(patient.firstName)) {
      errors.firstName = t('Enter a first name.');
      errorExist = true;
    }
    if (trimmedEmpty(patient.lastName)) {
      errors.lastName = t('Enter a last name.');
      errorExist = true;
    }
    if (patient.phone && maskedInvalid(patient.phone)) {
      errors.phone = t('Enter a valid phone.');
      errorExist = true;
    }
    if (patient.mobilePhone && maskedInvalid(patient.mobilePhone)) {
      errors.mobilePhone = t('Enter a valid mobile phone.');
      errorExist = true;
    }
    if (trimmedEmpty(patient.address)) {
      errors.address = t('Enter an address.');
      errorExist = true;
    }

    if (errorExist) {
      throw new SubmissionError(errors);
    }
  }

  handleSubmit(patient) {
    this.validate(patient);
    this.props.onSave(patient);
  }

  render() {
    const {pristine, invalid, handleSubmit, t} = this.props;

    return <Form className="patient-form" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
      <Row>
        <Field id="patient.personalId" label={t("Personal id") + ":"} name="personalId"
               component={MaskedInput} mask="99999999999" outerDivClass="col-lg-6"/>
        <Field id="patient.birthDate" label={t("Date of birth") + ":"} name="birthDate"
               component={MaskedInput} mask="9999-99-99" outerDivClass="col-lg-6"/>
      </Row>

      <Row>
        <Field name="firstName" id="patient.firstName" label={t("First name") + ":"}
               className="form-control" component={Input} outerDivClass="col-lg-6"/>
        <Field name="lastName" id="patient.lastName" label={t("Last name") + ":"}
               className="form-control" component={Input} outerDivClass="col-lg-6"/>
      </Row>

      <Row>
          <Field name="address" id="patient.address" label={t("Address") + ":"}
                 className="form-control" component={InputArea} rows={4} outerDivClass="col-lg-12"/>
      </Row>
      <Row>
        <Field name="phone" className="form-control" component={MaskedInput} mask="+370-999-99999"
               id="patient.phone" label={t("Phone") + ":"} outerDivClass="col-lg-3"/>

        <Field id="patient.mobilePhone" label={t("Mobile phone") + ":"} name="mobilePhone"
               className="form-control" component={MaskedInput} mask="+370-999-99999" outerDivClass="col-lg-3"/>

        <Field name="email" id="patient.email" label={t("Email") + ":"} className="form-control"
               component={Input} outerDivClass="col-lg-6"/>
      </Row>
      <Field name="occupation" id="patient.occupation" label={t("Occupation") + ":"}
             className="form-control" component={Input}/>


      <Field id="patient.employer" label={t("Employer") + ":"} name="employer"
             className="form-control" component={Input}/>

      <ButtonToolbar>
        <Button type="submit" disabled={invalid}><Glyphicon glyph="save"/> {t("Save")}</Button>
        <Button type="button" onClick={(e) => this.props.onBack(e, !pristine)}>
          <Glyphicon glyph="level-up"/> {t("Back")}</Button>
      </ButtonToolbar>
    </Form>
  }
}

PatientForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default PatientForm;


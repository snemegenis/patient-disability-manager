import React, {PropTypes} from "react";
import {Row} from "react-bootstrap";
import {Field} from "redux-form";
import InputArea from "./form/InputArea.jsx";
import Input from "./form/Input.jsx";
import {normalizeEmptyString} from "../../util/FieldUtil"

const normalizeCode = (value, previousValue) => !value || /^[\w\-]+$/.test(value) ? value : previousValue;

const Diagnosis = ({t, name, withDetails = false}) => (
  <div className="form-group">
    <Row>
      <Field name={`${name}.code`} id={`disability.${name}.code`} label={t("Code")}
             component={Input}  outerDivClass="col-lg-2" normalize={normalizeCode}/>
      <Field name={`${name}.text`} id={`disability.${name}.code`} label={t("Text")}
             component={Input} outerDivClass="col-lg-10"/>
    </Row>
    <Row>
      <Field name={`${name}.functionalClass`} id={`disability.${name}.functionalClass`} label={t("Functional class")}
             component={Input} outerDivClass="col-lg-4" normalize={normalizeEmptyString}/>
      <Field name={`${name}.degree`} id={`disability.${name}.degree`} label={t("Degree")}
             component={Input} outerDivClass="col-lg-4" normalize={normalizeEmptyString}/>
      <Field name={`${name}.stage`} id={`disability.${name}.stage`} label={t("Stage")}
             component={Input} outerDivClass="col-lg-4" normalize={normalizeEmptyString}/>
    </Row>
    <Field name={`${name}.history`} id={`disability.${name}.history`} label={t("Diagnosis history")}
           component={InputArea} rows={4} normalize={normalizeEmptyString}/>
    {withDetails && <Field name={`${name}.details`} id={`disability.${name}.details`} label={t("Diagnosis details")}
                           component={InputArea} rows={4} normalize={normalizeEmptyString}/>}
  </div>
);

Diagnosis.propTypes = {
  t: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  withDetails: PropTypes.bool,
  title: PropTypes.string
};

export default Diagnosis;
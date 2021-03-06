import React, {PropTypes} from 'react';
import Patient from "./Patient.jsx";
import {translate} from "react-i18next";
import {Button, FormGroup, Glyphicon, InputGroup, Table} from "react-bootstrap";


const PatientList = (props) => {
  const {
    patients, filter, loading, onDisabilityAdd, onDisabilityUpdate,
    onPrint, onAdd, onUpdate, onRemove, onShowAll, onFilter, t
  } = props;

  let filterInput;

  const onShowAllClick = () => {
    filterInput.value = '';
    onShowAll();
  };

  const onChange = () => {
    if (filterInput.value) {
      onFilter(filterInput.value);
    } else {
      onShowAll();
    }
  };

  let filteredPatients = patients;
  if (filter) {
    filteredPatients = patients.filter(patient =>
      patient.firstName.indexOf(filter) >= 0
      || patient.lastName.indexOf(filter) >= 0
      || patient.personalId.indexOf(filter) >= 0);
  }

  return <div>
    <div className="panel">
      <div className="form-inline">
        <FormGroup>
          <label className="control-panel" htmlFor="input-filter">{t('Filter by')}:</label>
          <InputGroup>
            <input id="input-filter" type="text" className="form-control"
                   ref={input => filterInput = input} defaultValue={filter ? filter : ''} onChange={onChange}/>
            {filter && <span className="input-group-btn">
          <Button onClick={onShowAllClick}><Glyphicon glyph="filter"/> {t('Show all')}</Button>
        </span>}
          </InputGroup>
        </FormGroup>
      </div>
    </div>
    <Table className="patient-list" responsive={true}>
      <thead>
      <tr>
        <th>{t('Personal id')}</th>
        <th>{t('First name')}</th>
        <th>{t('Last name')}</th>
        <th colSpan={2}>&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      {(filteredPatients.length === 0) && <tr>
        <td colSpan={5}>{t("No patients found")}</td>
      </tr>}
      {
        filteredPatients.map((patient, index) =>
          <Patient key={index} id={patient.id} personalId={patient.personalId}
                   firstName={patient.firstName} lastName={patient.lastName}
                   onPrint={onPrint}
                   onUpdate={onUpdate}
                   onRemove={onRemove}
                   disabilityReportId={patient.disabilityReportId}
                   tempSaved={patient.tempSaved}
                   onDisabilityAdd={onDisabilityAdd}
                   onDisabilityUpdate={onDisabilityUpdate}/>)
      }
      </tbody>
    </Table>
      <Button  onClick={() => onAdd()}><Glyphicon glyph="plus"/> {t('Add Patient')}</Button>
  </div>
};

PatientList.propTypes = {
  patients: PropTypes.array.isRequired,
  onPrint: PropTypes.func.isRequired,
  onDisabilityAdd: PropTypes.func.isRequired,
  onDisabilityUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
};

export default translate()(PatientList);


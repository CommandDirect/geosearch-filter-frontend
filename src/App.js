import React, { Component } from 'react';
import FilterList from './FilterList';
import FilterBool from './FilterBool';
import FilterTextBox from './FilterTextBox';
import {
  getCategoryData as apiGetCategoryData,
  getSpecialtyData as apiGetSpecialtyData,
  searchByListValue as apiSearchByListValue,
  searchByName as apiSearchByName,
  searchByValue as apiSearchByValue
} from './api';

const FIELDS = {
  PROVIDER_TYPE: 'Provider Type',
  SPECIALTY: 'Specialty',
  LANGUAGE: 'Language',
  GENDER: 'Gender',
  NEW_PATIENTS: 'Accepting New Patients',
  HANDICAP: 'Handicap Accessible',
  CERTIFIED: 'Board Certified'
};

const languageData = ['Chinese','Haitian-Creole','Hindi','Italian','Korean','Russian','Spanish'];

const genderData = [{name: 'Female', value: 'F'}, {name: 'Male', value: 'M'}];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.onChangeProviderType = this.onChangeProviderType.bind(this);
    this.onChangeSpecialty = this.onChangeSpecialty.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onToggleNewPatients = this.onToggleNewPatients.bind(this);
    this.onToggleHandicap = this.onToggleHandicap.bind(this);
    this.onToggleCertified = this.onToggleCertified.bind(this);
  }
  async componentDidMount() {
    let categoryData = [];
    let specialtyData = [];
    try {
      categoryData = await apiGetCategoryData('agewell');
      specialtyData = await apiGetSpecialtyData('agewell');
    } catch (error) {
      console.log(error);
    }

    const selectedProviders = getFormValue('providertype_name');
    const selectedSpecialties  = getFormValue('specialtie_name');
    const selectedLanguages = getFormValue('language_name');
    const selectedGenders = getFormValue('gender');

    this.setState({
      data: [{
          type: 'text',
          fieldName: FIELDS.PROVIDER_TYPE,
          options: categoryData.map(d => {
            return {
              name: d.category,
              selected: selectedProviders.includes(d.category)
            };
          })
        }, {
          type: 'text',
          fieldName: FIELDS.SPECIALTY,
          options: specialtyData.map(d => {
            return {
              name: d.specialty,
              selected: selectedSpecialties.includes(d.specialty)
            };
          })
        }, {
          type: 'text',
          fieldName: FIELDS.LANGUAGE,
          options: languageData.map(d => {
            return {
              name: d,
              selected: selectedLanguages.includes(d)
            };
          })
        }, {
          type: 'list',
          fieldName: FIELDS.GENDER,
          options: genderData.map(d => {
            return {
              ...d,
              selected: selectedGenders.includes(d.value)
            };
          })
        }, {
          type: 'bool',
          fieldName: FIELDS.NEW_PATIENTS,
          selected: getFormValue('acceptnew').includes('Y')
        }, {
          type: 'bool',
          fieldName: FIELDS.HANDICAP,
          selected: getFormValue('handicapaccess').includes('Y')
        }, {
          type: 'bool',
          fieldName: FIELDS.CERTIFIED,
          selected: getFormValue('certifications').includes('Y')
        }
      ]
    });
  }
  onChangeList(event, fieldName) {
    const updatedData = this.state.data.map(d => {
      if (d.fieldName === fieldName) {
        return {
          ...d,
          options: d.options.map(o => {
            if (o.name === event.target.value) {
              return {
                ...o,
                selected: event.target.checked
              };
            }

            return o;
          })
        };
      }
      return d;
    });

    return updatedData;
  }
  onChangeBool(event, fieldName) {
    const updatedData = this.state.data.map(d => {
      if (d.fieldName === fieldName) {
        return {
          ...d,
          selected: event.target.checked,
          value: event.target.checked ? 'Y' : 'none'
        };
      }

      return d;
    });

    return updatedData;
  }
  onChangeProviderType(value) {
    apiSearchByName('providertype_name', value);
  }
  onChangeSpecialty(value) {
    apiSearchByName('specialtie_name', value);
  }
  onChangeLanguage(value) {
    apiSearchByName('language_name', value);
  }
  onChangeGender(event) {
    const updatedData = this.onChangeList(event, FIELDS.GENDER);
    const dataField = findDataField(updatedData, FIELDS.GENDER);
    apiSearchByListValue(dataField, 'gender');
  }
  onToggleNewPatients(event) {
    this.searchByValue(event, FIELDS.NEW_PATIENTS, 'acceptnew');
  }
  onToggleHandicap(event) {
    this.searchByValue(event, FIELDS.HANDICAP, 'handicapaccess');
  }
  onToggleCertified(event) {
    this.searchByValue(event, FIELDS.CERTIFIED, 'certifications');
  }
  searchByValue(event, fieldName, elementId) {
    const updatedData = this.onChangeBool(event, fieldName);
    const dataField = findDataField(updatedData, fieldName);
    apiSearchByValue(dataField, elementId);
  }
  getOnChangeFunc(data) {
    switch (data.fieldName) {
      case FIELDS.PROVIDER_TYPE:
        return this.onChangeProviderType;
      case FIELDS.SPECIALTY:
        return this.onChangeSpecialty;
      case FIELDS.LANGUAGE:
        return this.onChangeLanguage;
      case FIELDS.GENDER:
        return this.onChangeGender;
      case FIELDS.NEW_PATIENTS:
        return this.onToggleNewPatients;
      case FIELDS.HANDICAP:
        return this.onToggleHandicap;
      case FIELDS.CERTIFIED:
        return this.onToggleCertified;
      default:
        return () => {};
    }
  }
  render() {
    return (
      <div className="filter-section">
        {this.state.data.map(d => {
          const onChangeFunc = this.getOnChangeFunc(d);
          switch (d.type) {
            case 'bool':
              return <FilterBool key={d.fieldName} onChange={onChangeFunc} {...d} />;
            case 'text':
              return <FilterTextBox key={d.fieldName} onChange={onChangeFunc} {...d} />;
            default:
              return <FilterList key={d.fieldName} onChange={onChangeFunc} {...d} />;
          }
        })}
      </div>
    );
  }
}

const getFormValue = (elementId) => {
  if (document.getElementById(elementId)) {
    return document.getElementById(elementId).value.replace(/'/g, '').split(',')
  }

  console.log(`DOM element not found for id: ${elementId}`);
  return 'none';
};

const findDataField = (data, name) => {
  for (let i = 0; i < data.length; i++) {
    const dataField = data[i];
    if (dataField.fieldName === name) {
      return dataField;
    }
  }

  return null;
}

export default App;

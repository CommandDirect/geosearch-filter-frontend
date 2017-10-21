import React from 'react';
import PropTypes from 'prop-types';
import FilterList from './FilterList';

class FilterBool extends React.Component {
  render() {
    const { fieldName, selected, onChange } = this.props;
    return (
      <FilterList fieldName={fieldName} options={[{name: 'Yes', selected }]} onChange={onChange} />
    );
  }
};

FilterBool.propTypes = {
  fieldName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FilterBool;
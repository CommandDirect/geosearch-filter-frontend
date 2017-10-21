import React from 'react';
import PropTypes from 'prop-types';

class FilterList extends React.Component {
  renderName() {
    return (
      <div className="filter-header">
        <div className="field-name">
          {this.props.fieldName}
        </div>
      </div>
    );
  }
  renderList() {
    return (
      <ul className="filter-list">
        {this.props.options.map(option => {
          return (
            <li key={option.name} className="checkbox" style={{ paddingLeft: 4 }}>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={option.selected}
                  onChange={this.props.onChange}
                  value={option.name} />
                {option.name}
              </label>
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    return (
      <div className="filter-field">
        {this.renderName()}
        {this.renderList()}
      </div>
    );
  }
};

FilterList.propTypes = {
  fieldName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
};

export default FilterList;
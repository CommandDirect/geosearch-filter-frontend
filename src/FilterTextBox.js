import React from 'react';
import PropTypes from 'prop-types';

const $ = window.$;

class FilterTextBox extends React.Component {
  componentDidMount() {
    const data = this.props.options.map((option, i) => {
      return {
        id: i+1,
        text: option.name,
        selected: option.selected
      };
    });
    $(this.input).select2({
      data,
      placeholder: this.props.fieldName,
      allowClear: true
    })
    .on("select2:select", this.onChange.bind(this))
    .on("select2:unselect", this.onClear.bind(this));
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  componentWillUnmount() {
    $(this.input).select2('destroy');
  }

  onChange(event) {
    const selectedIndex = event.currentTarget.selectedIndex;
    const value = $(event.currentTarget[selectedIndex]).text();
    this.props.onChange(value);
  }

  onClear() {
    this.props.onChange('none');
  }

  renderName() {
    return (
      <div className="filter-header">
        <div className="field-name">
          {this.props.fieldName}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="filter-field">
        {this.renderName()}
        <div style={{ padding: '8px 20px' }}>
          <select
            ref={input => this.input = input }
            style={{ padding: '4px', width: '100%', background: '#000' }}>
            <option />
          </select>
        </div>
      </div>
    );
  }
}

FilterTextBox.propTypes = {
  fieldName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default FilterTextBox;
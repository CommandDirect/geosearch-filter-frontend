import React from 'react';
import PropTypes from 'prop-types';

class LegendItem extends React.Component {
  render() {
    const { altText, src } = this.props;
    return (
      <div style={{display: 'inline-block', padding: '2px 8px'}}>
        <img src={src} alt={altText} height={12} width={12} style={{ marginRight: '4px' }} />
        <span style={{fontSize: '0.85em'}}>{altText}</span>
      </div>
    );
  }
}

LegendItem.propTypes = {
  altText: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default LegendItem;
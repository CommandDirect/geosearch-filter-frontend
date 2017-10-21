import React from 'react';
import LegendItem from './LegendItem';

class Legend extends React.Component {
  render() {
    return (
      <div style={{border: '1px solid gray', padding: '4px'}}>
        <LegendItem altText="Provider is not accepting new patients" src="/images/star.png" />
        <LegendItem altText="Accessible by public transit" src="/images/transit.png" />
        <LegendItem altText="Board certified" src="/images/check.png" />
        <LegendItem altText="Wheelchair accessible" src="/images/wheelchair.png" />
        <LegendItem altText="Cultural competency training completed" src="/images/world.png" />
      </div>
    );
  }
}

export default Legend;
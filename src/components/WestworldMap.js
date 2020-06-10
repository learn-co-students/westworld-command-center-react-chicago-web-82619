import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area';

const WestworldMap = (props) => {
  return (
    <Segment id="map">
      {props.areas.map((area, idx) => {
        return (
          <Area
            key={idx}
            {...area}
            hosts={props.hosts}
            handleHostSelection={props.handleHostSelection}
          />
        );
      })}
    </Segment>
  );
};

export default WestworldMap;

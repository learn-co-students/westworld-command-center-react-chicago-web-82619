import React from 'react';
import { Card } from 'semantic-ui-react';
import Host from './Host';

const HostList = (props) => {
  return (
    <Card.Group itemsPerRow={6}>
      {props.hosts.map((host, idx) => {
        return (
          <Host
            key={idx}
            host={host}
            handleHostSelection={props.handleHostSelection}
          />
        );
      })}
    </Card.Group>
  );
};

export default HostList;

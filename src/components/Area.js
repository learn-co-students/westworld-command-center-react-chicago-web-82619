import React from 'react';
import '../stylesheets/Area.css';
import HostList from './HostList';

const Area = (props) => {
  let label = props.name
    .split('_')
    .map((name) => name.slice(0, 1).toUpperCase() + name.slice(1, name.length))
    .join(' ');

  let hosts = props.hosts && props.hosts.filter((h) => h.area === props.name && h.active);

  return (
    <div className="area" id={props.name}>
      <h3 className="labels">{label}</h3>

      <HostList hosts={hosts} handleHostSelection={props.handleHostSelection} />
    </div>
  );
};

Area.propTypes = {
  hosts: function (props, propName, componentName) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;

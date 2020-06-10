import React, { Component } from 'react';
import './stylesheets/App.css';
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap';
import Headquarters from './components/Headquarters';
import axios from 'axios';

class App extends Component {
  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.
  state = {
    areas: [],
    hosts: [],
    allActivated: '',
    logs: [],
  };

  componentDidMount = async () => {
    const areas = await axios.get('http://localhost:3000/areas');
    const hosts = await axios.get('http://localhost:3000/hosts');
    this.setState({
      areas: areas.data,
      hosts: hosts.data,
    });
  };

  handleHostSelection = (host) => {
    console.log(`${host.firstName}: selected`);

    const updatedHosts = this.state.hosts.map((h) => {
      if (h.id === host.id) {
        return {
          ...h,
          selected: true,
        };
      } else {
        return {
          ...h,
          selected: false,
        };
      }
    });

    this.setState({
      hosts: updatedHosts,
    });
  };

  handleToggle = (host) => {
    console.log(`${host.firstName} is toggled`);

    const newHost = this.state.hosts.find((h) => h.id === host.id);
    newHost.active = !host.active;
    const msg = newHost.active
      ? `Activated ${host.firstName}`
      : `Decommission ${host.firstName}`;

    axios
      .patch(`http://localhost:3000/hosts/${host.id}`, newHost)
      .then((res) => console.log(res));

    const updatedHosts = this.state.hosts.map((h) => {
      if (h.id === host.id) {
        return newHost;
      } else {
        return h;
      }
    });

    this.setState((prevState) => ({
      hosts: updatedHosts,
      logs: [
        {
          type: 'warn',
          msg: msg,
        },
        ...prevState.logs,
      ],
    }));
  };

  handleAreaChange = (host, value) => {
    console.log(
      `${host.firstName} is changing area from ${host.area} to ${value}.`
    );

    const hostsInArea = this.state.hosts.filter((host) => host.area === value);
    const area = this.state.areas.find((area) => area.name === value);
    console.log('hostsInArea count: ', hostsInArea.length);
    console.log('area limit: ', area.limit);

    const areaName = value
      .split('_')
      .map(
        (name) => name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
      )
      .join(' ');

    if (hostsInArea.length < area.limit) {
      console.log('good to go');
      host.area = value;

      console.log(host);
      axios
        .patch(`http://localhost:3000/hosts/${host.id}`, host)
        .then((res) => {
          if (res.status === 200) {
            const updatedHosts = this.state.hosts.map((h) => {
              if (h.id === host.id) {
                return {
                  ...h,
                  area: value,
                };
              } else {
                return h;
              }
            });

            this.setState((prevState) => ({
              hosts: updatedHosts,
              logs: [
                {
                  type: 'notify',
                  msg: `${host.firstName} set in area ${areaName}`,
                },
                ...prevState.logs,
              ],
            }));
          }
        });
    } else {
      this.setState((prevState) => ({
        logs: [
          {
            type: 'error',
            msg: `Too many hosts. Cannot add ${host.firstName} to ${areaName}.`,
          },
          ...prevState.logs,
        ],
      }));
    }
  };

  handleToggleActivation = () => {
    this.state.hosts.map((host) => {
      if (this.state.allActivated) {
        host.active = false;
        axios.patch(`http://localhost:3000/hosts/${host.id}`, host);
      } else {
        host.active = true;
        axios.patch(`http://localhost:3000/hosts/${host.id}`, host);
      }
    });
    this.setState({
      allActivated: !this.state.allActivated,
    });
  };

  render() {
    console.log(this.state.logs);
    return (
      <Segment id="app">
        <WestworldMap
          areas={this.state.areas}
          hosts={this.state.hosts}
          handleHostSelection={this.handleHostSelection}
        />
        <Headquarters
          hosts={this.state.hosts}
          handleHostSelection={this.handleHostSelection}
          handleToggle={this.handleToggle}
          handleAreaChange={this.handleAreaChange}
          handleToggleActivation={this.handleToggleActivation}
          allActivated={this.state.allActivated}
          logs={this.state.logs}
        />
      </Segment>
    );
  }
}

export default App;

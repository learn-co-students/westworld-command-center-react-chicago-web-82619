import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details';
import ColdStorage from './ColdStorage';
import LogPanel from './LogPanel';

class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  render() {
    let inActiveHosts = this.props.hosts.filter((host) => !host.active);
    return (
      <Grid celled="internally">
        <Grid.Column width={8}>
          <ColdStorage
            hosts={inActiveHosts}
            handleHostSelection={this.props.handleHostSelection}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            hosts={this.props.hosts}
            handleToggle={this.props.handleToggle}
            handleAreaChange={this.props.handleAreaChange}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel
            handleToggleActivation={this.props.handleToggleActivation}
            allActivated={this.props.allActivated}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Headquarters;

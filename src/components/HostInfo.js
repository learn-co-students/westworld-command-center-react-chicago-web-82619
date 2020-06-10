import '../stylesheets/HostInfo.css';
import React, { Component } from 'react';
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from 'semantic-ui-react';
import axios from 'axios';

class HostInfo extends Component {
  state = {
    options: [],
  };

  componentDidMount = async () => {
    const areas = await axios.get('http://localhost:3000/areas');
    const options = areas.data.map((area) => {
      return {
        key: area.name,
        text: area.name
          .split('_')
          .map(
            (name) =>
              name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
          )
          .join(' '),
        value: area.name,
      };
    });

    this.setState({
      options: options,
    });
  };

  handleChange = (e, { value }) => {
    console.log('value: ', value);
    this.props.handleAreaChange(this.props.host, value);
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  };

  toggle = () => {
    this.props.handleToggle(this.props.host);
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.host.imageUrl}
            floated="left"
            size="small"
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.host.firstName} |{' '}
                {this.props.host.gender === 'Male' ? (
                  <Icon name="man" />
                ) : (
                  <Icon name="woman" />
                )}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={this.props.host.active ? 'Active' : 'Decommissioned'}
                  checked={this.props.host.active ? true : false}
                  slider
                />
              </Card.Meta>
              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.host.area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HostInfo;

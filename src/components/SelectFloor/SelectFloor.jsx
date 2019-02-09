import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { fetchAllFloors } from '../../actions/roomActions';

import './select-floor.scss';

class SelectFloor extends Component {
  state = {
    floors: [],
    ground: ''
  };

  componentDidMount() {
    fetchAllFloors().then(res => {
      const floors = res.data.floors;
      const ground = floors.pop();
      this.setState({ floors, ground });
    });
  }

  goToFloor = floorName => {
    const { history } = this.props;
    history.push(`/floor/${floorName}`);
  };

  render() {
    const { floors, ground } = this.state;
    return (
      <div className="select-floor">
        <img className="select-floor__roof" alt="roof" src="/roof.svg" />
        {floors.map(floor => (
          <div
            key={floor._id}
            onClick={() => this.goToFloor(floor.name)}
            onKeyPress={() => this.goToFloor(floor.name)}
            role="button"
            tabIndex="0"
          >
            <img className="select-floor__floor" alt="floor" src="/floor.svg" />
          </div>
        ))}
        <div
          onClick={() => this.goToFloor(ground.name)}
          onKeyPress={() => this.goToFloor(ground.name)}
          role="button"
          tabIndex="0"
        >
          <img className="select-floor__ground" alt="ground" src="/ground.svg" />
        </div>
      </div>
    );
  }
}

export default withRouter(SelectFloor);

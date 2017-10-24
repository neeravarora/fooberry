import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header, Modal, Button, Segment} from 'semantic-ui-react';

import * as playerActionCreators from '../../state/reducers/player/playerActionCreators';
import * as gameActionCreators from '../../state/reducers/game/gameActionCreators';

class AttackPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapon: null
    };
    this.selectWeapon = this.selectWeapon.bind(this);
    this.attack = this.attack.bind(this);
    this.endAttack = this.endAttack.bind(this);
  }

  render() {
    if (!this.state || !this.props.weapons) {
      return <p>Loading...</p>;
    }

    const weapons = this.props.weapons.toJS();
    console.dir(weapons);

    const weaponOptions = weapons.map((weapon, index) => {
      return <option key={'weapon-' + index}
        value={weapon.name}>{weapon.name}: D{weapon.damage} A{weapon.accuracy}</option>;
    });

    return (
      <Modal open={this.props.attacking === true}>
        <Modal.Header>Attack the Thief!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>You are attacking the Thief</Header>
            <p>Weapon:
              <select onChange={this.selectWeapon}
                defaultValue={this.state.weapon}>
                {weaponOptions}
              </select>
            </p>
            <Button onClick={this.attack}>Attack!</Button>
            <Button onClick={this.endAttack} floated='right'>End Attacks!</Button>
          </Modal.Description>
          <h2>Messages...</h2>
          <Segment>{this.props.toast}</Segment>
        </Modal.Content>
      </Modal>
    );
  }

  attack() {
    console.log(`Attacking with ${this.state.weapon}`);
    this.props.dispatch(playerActionCreators.chooseWeapon(this.state.weapon));
    this.props.dispatch(playerActionCreators.fireWeapon());
  }

  selectWeapon(event) {
    this.setState({weapon: event.target.value});
  }

  endAttack() {
    this.props.dispatch(gameActionCreators.endAttack());
  }
}

AttackPanel.propTypes = {
  attacking: PropTypes.bool,
  weapons: PropTypes.any,
  dispatch: PropTypes.func,
  toast: PropTypes.string
};

function mapStateToProps(state) {
  console.log(`attack state: ${state.game.attacking}`);
  return {
    attacking: state.game.attacking,
    toast: state.toast.activeToast,
    weapons: state.player.get('weapons')
  };
}

export default connect(mapStateToProps)(AttackPanel);


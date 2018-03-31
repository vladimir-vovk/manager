import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onShiftChange = this.onShiftChange.bind(this);
  }

  onNameChange(value) {
    this.props.employeeUpdate({ prop: 'name', value });
  }

  onPhoneChange(value) {
    this.props.employeeUpdate({ prop: 'phone', value });
  }

  onShiftChange(value) {
    this.props.employeeUpdate({ prop: 'shift', value });
  }

  renderPickerItems() {
    return (
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
        <Picker.Item label={day} value={day} key={day} />
      ))
    );
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="John Doe"
            onChangeText={this.onNameChange}
            value={this.props.name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            onChangeText={this.onPhoneChange}
            value={this.props.phone}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.label}>
            Shift
          </Text>

          <Picker
            selectedValue={this.props.shift}
            onValueChange={this.onShiftChange}
          >
            {this.renderPickerItems()}
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  label: {
    marginRight: 10,
    fontSize: 18,
    paddingLeft: 20,
  },
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employee;
  return {
    name,
    phone,
    shift,
  };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.onSaveEmployee = this.onSaveEmployee.bind(this);
  }

  onSaveEmployee() {
    const { name, phone, shift } = this.props;
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  renderButton() {
    if (this.props.saving) {
      return (
        <Spinner size="large" />
      );
    }

    return (
      <Button onPress={this.onSaveEmployee}>
        Save
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.textError}>
            {this.props.error.message}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  label: {
    marginRight: 10,
    fontSize: 18,
    paddingLeft: 20,
  },
  textError: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20,
  },
};

const mapStateToProps = (state) => {
  const { employee } = state;
  return {
    name: employee.name,
    phone: employee.phone,
    shift: employee.shift,
    saving: employee.saving,
    error: employee.error,
  };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeCreate,
})(EmployeeCreate);

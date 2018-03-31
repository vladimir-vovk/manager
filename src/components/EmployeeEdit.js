import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Communications } from 'react-native-communications';
import { employeeSet, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.onSaveButton = this.onSaveButton.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onDeleteEmployee = this.onDeleteEmployee.bind(this);
    this.onModalYes = this.onModalYes.bind(this);
    this.onModalNo = this.onModalNo.bind(this);
  }

  componentWillMount() {
    this.props.employeeSet({ employee: this.props.employee });
  }

  onSaveButton() {
    const { name, phone, shift, uid } = this.props;
    this.props.employeeSave({ name, phone, shift, uid });
  }

  onSendMessage() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onDeleteEmployee() {
    this.setState({ showModal: true });
  }

  onModalYes() {
    this.props.employeeDelete({ uid: this.props.uid });
    this.setState({ showModal: false });
  }

  onModalNo() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onSaveButton}>
            Save changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onSendMessage}>
            Send message
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onDeleteEmployee}>
            Delete
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onModalYes}
          onDecline={this.onModalNo}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift, uid } = state.employee;
  return { name, phone, shift, uid };
};

export default connect(mapStateToProps, {
  employeeSet, employeeSave, employeeDelete,
})(EmployeeEdit);

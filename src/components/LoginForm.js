import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginPress() {
    this.props.loginUser(this.props);
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
    return '';
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <Spinner />
      );
    } else {
      return (
        <Button onPress={this.onLoginPress}>
          Login
        </Button>
      );
    }

  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            onChangeText={this.onEmailChange}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            placeholder="your secret password"
            secureTextEntry
            onChangeText={this.onPasswordChange}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  textError: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20,
  },
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    email: auth.email,
    password: auth.password,
    error: auth.error,
    loading: auth.loading,
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);

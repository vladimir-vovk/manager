import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress() {
    Actions.employeeEdit({ employee: this.props.employee});
  }

  render () {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onItemPress}>
        <View>
          <CardSection>
            <Text style={styles.text}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  text: {
    paddingLeft: 15,
    fontSize: 18,
  },
};

export default ListItem;

import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import { Spinner } from './common';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  renderList() {
    if (this.props.loading) {
      return (
        <View style={{ height: 60 }}>
          <Spinner size="large" />
        </View>
      );
    }

    return (
      <View>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  render() {
    return this.renderList();
  }
}

const mapStateToProps = (state) => {
  // convert object-like data returned from firebase { uid1: { employee1 }, uid2: { employee2 }, ... }
  // to list of employee objects [{ employee1 }, { employee2 }, ...]
  const employees = _.map(state.employees.data, (val, uid) => {
    return { ...val, uid };
  });

  return {
    loading: state.employees.loading,
    employees,
  };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);

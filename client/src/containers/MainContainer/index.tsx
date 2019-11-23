import * as React from "react";
//REDUX
import { connect } from "react-redux";
import { getUsers, getAccounts } from "../../redux/actions/databaseActions";
//COMPONENTS
import { Card, SpinnerComponent } from "../../components";

const handleChange = Symbol();
const handleAddData = Symbol();
const handleRemoveData = Symbol();
const handleUpdateData = Symbol();
const handleGetAccounts = Symbol();

class MainContainer extends React.Component<any, any> {
  componentDidMount() {
    this.props.getUsers();
  }

  [handleAddData] = (): void => {};
  [handleRemoveData] = (e: any, value: string): void => {};
  [handleUpdateData] = (e: any, name: string): void => {};

  [handleChange] = (e: any) => {};

  [handleGetAccounts] = (e: any, user_id: any): any => {
    this.props.getAccounts(user_id);
  };

  checkEmpty = (array: any): boolean => {
    console.log(array);
    return array && array.constructor === Array && array.length === 0;
  };

  render() {
    const { loading, users, accounts } = this.props;
    return (
      <>
        {loading ? (
          <SpinnerComponent />
        ) : this.checkEmpty(users) ? (
          "No entries found."
        ) : (
          users.map((item: any, i: any) => (
            <Card
              key={i}
              name={item.name}
              user_number={item.user_number}
              user_id={item.user_id}
              age={item.age}
              account_ids={!this.checkEmpty(accounts) ? accounts : []}
              onClickRemove={this[handleRemoveData]}
              onClickUpdate={this[handleUpdateData]}
              onGetAccounts={this[handleGetAccounts]}
            />
          ))
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.database.data,
  accounts: state.database.accounts,
  loading: state.database.loading
});

export default connect(mapStateToProps, { getUsers, getAccounts })(
  MainContainer
);

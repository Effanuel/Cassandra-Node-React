import * as React from "react";
//REDUX
import { connect } from "react-redux";
import {
  getUsers,
  getAccounts,
  removeAccounts
} from "../../redux/actions/databaseActions";
import { modalOpen } from "../../redux/actions/modalActions";
//COMPONENTS
import { Card, SpinnerComponent } from "../../components";
import { AddModal, AddCardModal } from "../";

const handleAddCard = Symbol();
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
  [handleUpdateData] = (e: any, user_id: string): void => {
    const data = { showModal: "addModal", selectedUserId: user_id };
    this.props.modalOpen(data);
  };

  [handleAddCard] = (e: any, account_id: any) => {
    const data = { showModal: "addCardModal", selectedAccountId: account_id };
    this.props.modalOpen(data);
  };

  [handleGetAccounts] = (e: any, user_id: any): any => {
    const { accounts } = this.props;
    if (!this.checkEmpty(accounts)) {
      const arr = accounts.map((el: any, i: any) => {
        return el.user_id === user_id;
      });
      arr.includes(true)
        ? this.props.removeAccounts(user_id)
        : this.props.getAccounts(user_id);
    } else {
      this.props.getAccounts(user_id);
    }
  };

  checkEmpty = (array: any): boolean => {
    console.log(array);
    return array && array.constructor === Array && array.length === 0;
  };

  render() {
    const { loading, users, accounts, error } = this.props;
    return (
      <>
        <div style={{ color: "red" }}>{error}</div>
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
              onClickAddCard={this[handleAddCard]}
            />
          ))
        )}
        <AddModal />
        <AddCardModal />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.database.data,
  accounts: state.database.accounts,
  loading: state.database.loading,
  error: state.database.error
});

export default connect(mapStateToProps, {
  getUsers,
  getAccounts,
  removeAccounts,
  modalOpen
})(MainContainer);

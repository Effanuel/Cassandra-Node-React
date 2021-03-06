import React from "react";

import { connect } from "react-redux";
import { getCards, removeCards } from "../../redux/actions/databaseActions";
import {
  databaseAccountsSelector,
  databaseLoadingSelector,
  databaseCardsSelector,
} from "../../redux/selectors";

import { Button } from "react-bootstrap";
import { SpinnerComponent } from "../SpinnerComponent";
import "./styles.css";

interface Props {
  name: string;
  user_number: string;
  user_id: number;
  age: number;
  onClickUpdate: (e: any, name: string) => void;
  onClickRemove: (e: any, name: string) => void;
  onClickCopy: (e: any) => any;
}

const handleGetCards = Symbol();

class Card extends React.Component<any, any> {
  checkEmpty = (array: any): boolean => {
    return array && array.constructor === Array && array.length === 0;
  };

  [handleGetCards] = (e: any) => {
    const { cards } = this.props;
    const { id } = e.target;
    if (!this.checkEmpty(cards)) {
      const arr = cards.map((el: any, i: any) => {
        return el.account_id == id;
      });
      arr.includes(true) ? this.props.removeCards(id) : this.props.getCards(id);
    } else {
      this.props.getCards(id);
    }
  };

  render() {
    const {
      user_number,
      user_id,
      name,
      age,
      account_ids,
      onClickUpdate,
      onClickRemove,
      onGetAccounts,
      onClickAddCard,
      loading,
      cards,
    } = this.props;
    return (
      <>
        <div className="container">
          <span
            className="secondary-container"
            onClick={(e: any) => onGetAccounts(e, user_id)}
          >
            <span className="span-style">
              Id: <span className="user_id-style">{user_id} </span>
            </span>
            <span className="span-style">
              Number: <span className="user_number-style">{user_number} </span>
            </span>

            <span className="span-style">
              Name: <span className="name-style">{name} </span>
            </span>
            <span className="span-style">
              Age: <span className="age-style">{age} </span>
            </span>
            {/* <span className="span-style">
              AccountIDS:{" "}
              <span className="age-style">{account_ids || "none"} </span> */}
            {/* </span> */}
          </span>
          <div className="button-container">
            <Button
              variant="info"
              onClick={(e: any) => onClickUpdate(e, user_id)}
            >
              +
            </Button>
          </div>
        </div>
        {loading ? (
          <SpinnerComponent />
        ) : !this.checkEmpty(account_ids) ? (
          account_ids.map((acc: any, i: any) =>
            user_id === acc.user_id ? (
              <React.Fragment key={i}>
                <div className="account-container">
                  <span
                    id={acc.account_id}
                    className="secondary-container red"
                    onClick={this[handleGetCards]}
                  >
                    <span className="span-style">Account ID: </span>
                    {acc.account_id}
                  </span>
                  <div className="button-container">
                    <Button
                      variant="info"
                      onClick={(e: any) => onClickAddCard(e, acc.account_id)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {loading ? (
                  <SpinnerComponent />
                ) : !this.checkEmpty(cards) ? (
                  cards.map((item: any, j: any) =>
                    item.account_id === acc.account_id ? (
                      <div className="cards-container" key={item.card_id}>
                        <span className="secondary-container accent">
                          <span>
                            <span className="span-style">Balance: </span>
                            {item.balance}
                          </span>
                          <span className="lblue">
                            <span className="span-style"> Card ID: </span>
                            {item.card_id}
                          </span>
                        </span>
                      </div>
                    ) : null
                  )
                ) : null}
              </React.Fragment>
            ) : null
          )
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  accounts: databaseAccountsSelector(state),
  loading: databaseLoadingSelector(state),
  cards: databaseCardsSelector(state),
});

export default connect(mapStateToProps, { getCards, removeCards })(Card) as any;

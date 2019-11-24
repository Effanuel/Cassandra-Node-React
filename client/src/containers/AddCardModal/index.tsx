import React from "react";
// REDUX
import { connect } from "react-redux";
import { modalClose } from "../../redux/actions/modalActions";
import { addCard } from "../../redux/actions/databaseActions";
import {
  modalShowModalSelector,
  databaseLoadingSelector
} from "../../redux/selectors";
// COMPONENTS
import { ModalComponent, SpinnerComponent } from "../../components";

const initialState = Object.freeze({ card_id: "", balance: 0 });

const handleSave = Symbol();
const handleClose = Symbol();

const handleChange = Symbol();

class AddCardModal extends React.Component<any, any> {
  readonly state: any = initialState;

  [handleSave] = (): void => {
    const card_id = parseInt(this.state.card_id);
    const balance = parseInt(this.state.balance);
    const { selectedAccountId } = this.props;
    const data = { card_id, account_id: selectedAccountId, balance };
    this.props.addCard(data);
  };

  [handleClose] = (): void => {
    this.props.modalClose();
    this.setState(initialState);
  };
  [handleChange] = (event: any): any => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    } as Pick<any, keyof any>);
  };

  render() {
    const { showModal, loading, selectedAccountId } = this.props;
    const { card_id } = this.state;
    return (
      <>
        <ModalComponent
          title={`Add a new card for account: ${selectedAccountId}`}
          show={showModal === "addCardModal" || false}
          onSave={this[handleSave]}
          onClose={this[handleClose]}
          p_1="Card id"
          label_id1="Card ID"
          input_id1="card_id"
          p_2="Balance"
          label_id2="Balance"
          input_id2="balance"
          onInputChange={this[handleChange]}
          loadingComponent={loading ? <SpinnerComponent /> : null}
          disabled={!card_id}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showModal: modalShowModalSelector(state),
  loading: databaseLoadingSelector(state),
  selectedAccountId: state.modal.selectedAccountId
});

export default connect(mapStateToProps, {
  modalClose,
  addCard
  // addData
})(AddCardModal);

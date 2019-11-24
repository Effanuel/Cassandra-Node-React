import React from "react";
// REDUX
import { connect } from "react-redux";
import { modalClose } from "../../redux/actions/modalActions";
import { addAccount } from "../../redux/actions/databaseActions";
import {
  modalShowModalSelector,
  databaseLoadingSelector
} from "../../redux/selectors";
// COMPONENTS
import { ModalComponent, SpinnerComponent } from "../../components";

const initialState = Object.freeze({ account_id: "" });

const handleSave = Symbol();
const handleClose = Symbol();

const handleChange = Symbol();

class AddModal extends React.Component<any, any> {
  readonly state: any = initialState;

  [handleSave] = (): void => {
    const account_id = parseInt(this.state.account_id);
    const { selectedUserId } = this.props;
    const data = { account_id, selectedUserId };
    this.props.addAccount(data);
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
    const { showModal, loading, selectedUserId, error } = this.props;
    const { account_id } = this.state;
    return (
      <>
        <ModalComponent
          title={`Add a new account for user: ${selectedUserId}`}
          show={showModal === "addModal" || false}
          onSave={this[handleSave]}
          onClose={this[handleClose]}
          input_id="account_id"
          label_id1="Account ID"
          p_1="account id"
          onInputChange={this[handleChange]}
          loadingComponent={loading ? <SpinnerComponent /> : null}
          disabled={!account_id}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showModal: modalShowModalSelector(state),
  loading: databaseLoadingSelector(state),
  selectedUserId: state.modal.selectedUserId
});

export default connect(mapStateToProps, {
  modalClose,
  addAccount
  // addData
})(AddModal);

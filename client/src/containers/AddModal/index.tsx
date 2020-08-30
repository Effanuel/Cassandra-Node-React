import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { modalClose } from "../../redux/actions/modalActions";
import { addAccount } from "../../redux/actions/databaseActions";
import { ModalComponent, SpinnerComponent } from "../../components";
import { AppState } from "../../redux/models/state";

export default React.memo(() => {
  const dispatch = useDispatch();
  const [accountId, setAccountId] = React.useState("");

  const { showModal, loading, selectedUserId } = useSelector(
    (state: AppState) => ({
      showModal: state.modal.showModal,
      loading: state.database.loading,
      selectedUserId: state.modal.selectedUserId,
    }),
    shallowEqual
  );

  const handleSave = React.useCallback(() => {
    const account_id = parseInt(accountId);
    dispatch(addAccount({ account_id, selectedUserId }));
  }, [dispatch, accountId, selectedUserId]);

  const handleClose = React.useCallback(() => {
    dispatch(modalClose());
    setAccountId("");
  }, [dispatch]);

  const handleChange = React.useCallback(({ target: { value } }) => {
    setAccountId(value);
  }, []);

  return (
    <ModalComponent
      title={`Add a new account for user: ${selectedUserId}`}
      show={showModal === "addModal" || false}
      onSave={handleSave}
      onClose={handleClose}
      input_id="account_id"
      label_id1="Account ID"
      p_1="account id"
      onInputChange={handleChange}
      loadingComponent={loading ? <SpinnerComponent /> : null}
      disabled={accountId === ""}
    />
  );
});

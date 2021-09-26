import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/userActions";
import "./AccountPage.scss";

export const AccountPage = (props) => {
  const dispatch = useDispatch();

  const commitLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="account-page page center-childs">
      <button className="primary-button" onClick={commitLogout}>
        Log Out
      </button>
    </div>
  );
};

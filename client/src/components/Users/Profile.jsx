import { useContext } from "react";
import UserContext from "../../contexts/user-context";
import PageTitle from "../PageTitle";

function Profile() {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <PageTitle title="Profile" />
      {!user && <h2>No Customer Selected</h2>}
      {user && (
        <>
          <div id="main-pane-content">
            <div className="panel">
              <h3>User Details</h3>
              <div className="panel-contents">
                <div className="panel-contents-section">
                  <div className="panel-section-desc">ID</div>
                  <div className="panel-section-data">
                    <div className="data-item">{user.id}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">User since</div>
                  <div className="panel-section-data">
                    <div className="data-item">{user.created_date}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">📧</div>
                  <div className="panel-section-data">
                    <div className="data-item">{user.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;

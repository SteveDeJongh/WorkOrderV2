import { Link } from "react-router-dom";
import { CapitalizeFullName } from "../../utils";
import PageTitle from "../PageTitle";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <PageTitle title="Profile" />
      {!user && <h2>No Active User</h2>}
      {user && (
        <>
          <div id="panes">
            <div className="pane pane-full">
              <div className="pane-inner">
                <div className="main-pane-content">
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
                        <div className="panel-section-desc">Name</div>
                        <div className="panel-section-data">
                          <div className="data-item">
                            {CapitalizeFullName(user.name)}
                          </div>
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
                      <div className="panel-contents-section">
                        <div className="panel-section-desc">Roles</div>
                        <div className="panel-section-data">
                          {user.roles.map((role) => (
                            <div className="data-item" key={role}>
                              {role}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel">
                    <h3>Profile Actions</h3>
                    <div className="panel-contents">
                      <div className="panel-contents-section">
                        <Link to={"/profile/edit"}>Edit Profile</Link>
                      </div>
                    </div>
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

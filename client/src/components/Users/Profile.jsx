import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user-context";
import { fetchUserData } from "../../services/userServices";

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [profileData, setprofileData] = useState({});
  const [id, setID] = useState(user ? user.id : null);

  // let id = user ? user.id : null;

  console.log(user, "User from component scope.");
  console.log(id);

  useEffect(() => {
    console.log("In the useEffect");
    async function loadprofileData() {
      if (!id) {
        console.log("Getting in here");
        setprofileData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchUserData(id);
        setprofileData(response);
        console.log(profileData);
        console.log(user);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadprofileData();
  }, [id]);

  console.log(profileData);

  return (
    <>
      {mainLoading && <p>Information loading...</p>}
      {mainError && <p>An error occured.</p>}
      {!mainLoading && !mainError && (
        <>
          {!profileData && <h2>No Customer Selected</h2>}
          {profileData && (
            <>
              <div id="main-pane-content">
                <div className="panel">
                  <h3>Details</h3>
                  <div className="panel-contents">
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">📞</div>
                      <div className="panel-section-data">
                        <div className="data-item">{profileData.id}</div>
                        <div className="data-item">
                          {profileData.created_date}
                        </div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">📧</div>
                      <div className="panel-section-data">
                        <div className="data-item">{profileData.email}</div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">🏠</div>
                      <div className="panel-section-data">
                        <div className="data-item">{profileData.address}</div>
                        <div className="data-item">
                          {profileData.city} {profileData.province}{" "}
                          {profileData.postal}
                        </div>
                        <div className="data-item">{profileData.country}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel profileData-notices">
                  <h3>
                    Notices <span>({`${0}`})</span>
                  </h3>
                  <ul>
                    <li>No Notices</li>
                  </ul>
                </div>
                <div className="panel customer-history">
                  <h3>History</h3>
                  <ul>
                    <li>Todo...</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Profile;

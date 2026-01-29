import { useEffect, useState } from "react";
import "./User.css";
import Header from "./Header";
function User() {
  const [profile, setProfile] = useState("");
  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProfile(data);
    }

    loadProfile();
  }, []);

  return (
    <>
      <Header />
      <div className="fitness-container">
        <div className="profile-wrapper">
          <div className="card">
            <h3>
              {profile.firstname} {profile.lastname}
            </h3>
            <p>
              <b>Email: </b>
              {profile.email}
            </p>
            <p>
              <b>Birth:</b>
              {profile.birthdate &&
                new Date(profile.birthdate).toLocaleDateString()}
            </p>
            <p>
              <b>Address:</b> {profile.address}
            </p>
          </div>

          <div className="subscription">
            <h3>Membership</h3>
            <p>
              FROM:{" "}
              {profile.subscription_start &&
                new Date(profile.subscription_start).toLocaleDateString(
                  "de-DE",
                  {
                    hour: "2-digit",
                  }
                )}
            </p>
            <p>
              TO:{" "}
              {profile.subscription_end &&
                new Date(profile.subscription_end).toLocaleDateString()}
            </p>
            <p className="price">{profile.monthly_price} €</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;

import { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
function Admin() {
  //for ADD user//
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [count, setCount] = useState("");
  // for show all users//
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function loadUsers() {
      if (!token) {
        return navigate("/");
      }
      const res = await fetch("http://localhost:3000/api/user/getUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUsers(data);
    }

    async function loadUserCount() {
      const res = await fetch("http://localhost:3000/api/user/users/count", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const count = await res.json();
      setCount(count);
    }
    loadUserCount();
    loadUsers();
  }, []);

  async function addUser() {
    if (!email || !password || !firstname || !lastname || !role) {
      alert("All fields are required");
      return;
    }

    await fetch("http://localhost:3000/api/user/addUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        role,
      }),
    });

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setRole("user");
  }

  // DEELTE User:
  async function deleteUser(id) {
    await fetch(`http://localhost:3000/api/user/deleteUser/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return (
    <>
      <Header />
      {/* ADD USER */}
      <div className="controlBox">
        <h3>Add User</h3>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="First name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <input
          placeholder="Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={addUser}>Add User</button>
      </div>
      <h3>Total users: {count}</h3>
      {/* finsih ADD USER */}
      <div className="container">
        <h1 className="title"> Admin Dashboard</h1>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th className="th">ID</th>
                <th className="th">Email</th>
                <th className="th">Role</th>
                <th className="th">First Name</th>
                <th className="th">Last Name</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr>
                  <td className="td">{user.id}</td>
                  <td className="td">{user.email}</td>
                  <td className="td">{user.role}</td>
                  <td className="td">{user.firstname}</td>
                  <td className="td">{user.lastname}</td>

                  <td className="td">
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;

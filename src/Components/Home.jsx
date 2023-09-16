/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then((res) => setData(res.data))
            .catch((err) => console.log("err in api"));
    }, []);

    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to Delete?");

        if (confirm) {
            axios
                .delete("http://localhost:3000/users/" + id)
                .then((res) => {
                    // navigate("/");
                    location.reload();
                })
                .catch((err) => console.log(err));
        }
    };



    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="mb-5 mt-5">List of User</h1>
            <div className="w-75 rounded bg-white border shadow p-4">
                <nav className="navbar bg-body-secondary">
                    <div className="container-fluid">
                        <a className="navbar-brand">REACT CRUD</a>

                        <form className="d-flex ">
                            <Link to="/create">
                                <button className="btn btn-sm btn-outline-dark">
                                    Add New User
                                </button>
                            </Link>
                        </form>
                    </div>
                </nav>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody className="table-group-divider">
                        {data.map((user, i) => (
                            <tr key={i}>
                                <th scope="row">{user.id}</th>
                                <th scope="row">{user.name}</th>
                                <th scope="row">{user.email}</th>
                                <th scope="row">{user.phone}</th>

                                <td scope="row">
                                    <Link
                                        to={`/read/${user.id}`}
                                        className="btn btn-sm btn-dark me-2"
                                    >
                                        Read
                                    </Link>
                                    <Link
                                        to={`/update/${user.id}`}
                                        className="btn btn-sm btn-warning me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={(e) => handleDelete(user.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;

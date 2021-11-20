import React, { useState } from 'react'
import axios from 'axios'
import '../admin/App.css'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure()
const Login = () => {
    let history = useHistory();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const { email, password } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {

        e.preventDefault();
        let result = await axios.post("https://localhost:4000/api/admin/login", user);
        if (result.status === 200) {
            toast.success(`login Successfull`, {
                position: "top-center",
                autoClose: 1000,
                onClose: () => {
                    history.push(`/admin/home/${result.data[0].admin_id}`)
                }
            })

        } else {
            toast.warn(`${result.data}`, {
                position: "top-center",
                autoClose: 2000,
                onClose: () => {
                    history.push("/login")
                }
            })
        }

    };
    return (
        <div>
            <html>

                <head>
                    <title>Log In</title>

                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />

                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />

                    <link href="http://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


                </head>

                <body style={{ background: "url('/img/back_login.jpg') center no-repeat" }}>
                    <div class="container">
                        <div class="d-flex justify-content-center h-100">
                            <div class="card">
                                <div class="card-header ">
                                    <h3 class="text-white">LOG IN</h3>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={e => onSubmit(e)}>
                                        <div class="col-sm-11 pl-5">
                                            <div class="input-group form-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-user"></i></span>
                                                </div>
                                                <input type="email"
                                                    maxlength="30"
                                                    class="form-control"
                                                    id="name1"
                                                    name="email"
                                                    value={email}
                                                    onChange={e => onInputChange(e)}
                                                    placeholder="Email" required>
                                                </input>
                                            </div>
                                            <div class="input-group form-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                                </div>
                                                <input type="password" class="form-control" id="password" name="Password" placeholder="password" title="it must contain one upper case letter,one lower case and one special character" maxlength="20" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required></input>
                                            </div>

                                            <div class="form-group login_button">
                                                <input type="submit" name="submit" id="submit" value="Log In" class="btn btn-success float-right login_btn " />
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <div class="d-flex justify-content-center links">

                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <a href="forgotpassword.php">Forgot your password?</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                </body>
            </html>
        </div>

    )
}

export default Login;
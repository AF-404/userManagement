import React from 'react';
import '../App.css';
import { Base64 } from 'js-base64';
import userApi from "../actions/userApi.js";
import swal from 'sweetalert';

const initialState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
}

class Login extends React.Component {

    state =initialState;

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    SubmitForm = e => {
        e.preventDefault();
        const isValid = this.validation();
        if(isValid){
            console.log(this.state);
            userApi.user().fetchAll().then(res => {
                const user = res.data.filter( user => user.email===this.state.email)
                if(user.length===1){
                    if(user[0]['password']===Base64.encode(this.state.password)){
                        swal("Success!", "Wellcome!", "success")
                        this.setState(initialState)
                        localStorage.setItem('type',user[0]['type'])
                        localStorage.setItem('name',user[0]['name'])
                        localStorage.setItem('email',user[0]['email'])
                        window.location.href = '/order'
                    }else{
                        swal("Error!", "Wrong Password!", "error")
                    }
                }else{
                    swal("Error!", "Wrong Email!", "error")
                }
            });
        }
    }

    validation = () => {
        let emailError = "";
        let passwordError = "";

        if(!this.state.password){
            passwordError="Password Required!"
        }

        if(!this.state.email){
            emailError="Email Required!"
        }else if(!this.state.email.includes('@')||!this.state.email.includes('.')){
            emailError = "Invalid Email!";
        }

        if(emailError || passwordError){
            this.setState({ emailError , passwordError});
            return false;
        }

        return true;
    }

    render (){
        const mystyle1 = {
            color: "white",
            backgroundColor: "black",
            padding: "10px",
            fontFamily: "Arial"
          };
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <h1 style={mystyle1}>Login</h1>
                    <hr/>
                    <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                            <label for="email_address" class="col-md-4 col-form-label text-md-right">Email</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.emailError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.passwordError}</div>
                            </div>
                        </div>
                                
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-outline-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;

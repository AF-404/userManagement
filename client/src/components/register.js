import React from 'react';
import '../App.css';
import userApi from "../actions/userApi.js";
import swal from 'sweetalert';

const initialState = {
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
    addressError: "",
    nameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
    cpasswordError: ""
}


class Register extends React.Component {
    
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
                const user = res.data.filter( user => user.email===this.state.email);
                if(user.length>0){
                    swal("Warning!", "Email Already Exists!", "warning")
                }else{
                    userApi.user().create(this.state)
                    .then(res => {
                        swal("Success!", "Register Successful!", "success")
                        this.setState(initialState)
                        this.props.history.push('/login')
                    } );
                }
            });
        }
    }

    validation = () => {
        let nameError = "";
        let addressError = "";
        let phoneError = "";
        let emailError = "";
        let passwordError = "";
        let cpasswordError = "";

        if(!this.state.name){
            nameError="Name Required!"
        }

        if(!this.state.address){
            addressError="Address Required!"
        }

        if(!this.state.phone){
            phoneError="Phone Number Required!"
        }else if(this.state.phone.length!==10){
            phoneError = "Invalid Phone Number!";
        }else if(isNaN(this.state.phone)){
            phoneError = "Use only digits!";
        }

        if(!this.state.email){
            emailError="Email Required!"
        }else if(!this.state.email.includes('@')||!this.state.email.includes('.')){
            emailError = "Invalid Email!";
        }

        if(!this.state.password){
            passwordError="Password Required!"
        }

        if(!this.state.cpassword){
            cpasswordError="Confirm Password Required!"
        }else if(this.state.cpassword!==this.state.password){
            cpasswordError="Password & Confirm Password Not Equal!"
        }

        if(emailError || passwordError || nameError || addressError || phoneError || cpasswordError){
            this.setState({ emailError , passwordError , nameError , addressError , phoneError , cpasswordError});
            return false;
        }

        return true;
    }

    render (){
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <h1>Register</h1>
                    <hr/>
                    <form autoComplete="off" onSubmit={this.SubmitForm}>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.nameError}</div>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Address</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.addressError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Phone Number</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.phoneError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Email</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.emailError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Password</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.passwordError}</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="cpassword" value={this.state.cpassword} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.cpasswordError}</div>
                            </div>
                        </div>
                                
                        <div class="col-md-4 offset-md-4">
                            <button type="submit" class="btn btn-outline-primary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default Register;

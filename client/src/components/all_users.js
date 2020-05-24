import React from 'react';
import '../App.css';
import userApi from "../actions/userApi.js";
import swal from 'sweetalert';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const url = "http://localhost:3500/user";
        fetch(url).then(response => response.json())
        .then(json => this.setState({users: json.filter(user => user.email!==localStorage.getItem('email'))}))
    }

    onDelete(id){

        swal({
            title: "Are you sure?",
            text: "Delete this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                userApi.user().delete(id)
                .then(res =>{
                    swal("Delete Successful!", {
                        icon: "success",
                    })
                    this.componentDidMount()
                });
            }
          })
        
    }

    onChangeUser(id,type){
        
        swal({
            title: "Are you sure?",
            text: "change the privilege?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var data = { type:type}
                userApi.user().update(id,data)
                .then(res =>{
                    swal("Change Successful!", {
                        icon: "success",
                    })
                    this.componentDidMount()
                });
            }
          })

    }

    onChange_S_M(id,type,email){

        swal({
            title: "Are you sure?",
            text: "change the privilege?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var data = { type:type}
                userApi.user().update(id,data)
                .then(res =>{
                    swal("Change Successful!", {
                        icon: "success",
                    })
                    this.componentDidMount()
                    var data = { email:email , msg:"Change To SM" }
                    userApi.user().email(data)
                });
            }
          })

    }

    editButton(type,id,email){
        if(type==="user"){
            return  [<button type='button' onClick={() => this.onChangeUser(id,"admin")} class="btn btn-outline-warning">Admin</button>,
                    <br></br>,
            <button type='button' onClick={() => this.onChange_S_M(id,"sm",email)} class="btn btn-outline-success">S.M</button>];
        }else if(type==="admin"){
            return [<button type='button' onClick={() => this.onChangeUser(id,"user")} class="btn btn-outline-warning">User</button>,
                    <br></br>,
            <button type='button' onClick={() => this.onChange_S_M(id,"sm",email)} class="btn btn-outline-success">S.M</button>];
        }else if(type==="sm"){
            return [<button type='button' onClick={() => this.onChangeUser(id,"admin")} class="btn btn-outline-warning">Admin</button>,
                    <br></br>,
            <button type='button' onClick={() => this.onChangeUser(id,"user")} class="btn btn-outline-success">User</button>];
        }
    }

    render (){
        if(localStorage.getItem('email')){
            const {users} = this.state;
            return (
                <div class="container">
                <br/><br/>
                    <div class="justify-content-center">
                        <h1>ALL Users</h1>
                        <hr/>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="tableTh">Name</th>
                                    <th class="tableTh">Address</th>
                                    <th class="tableTh">Email</th>
                                    <th class="tableTh">Phone</th>
                                    <th class="tableTh">User Type</th>
                                    <th class="tableTh">Change</th>
                                    <th class="tableTh">Remove User</th>
                                </tr>
                            </thead>
                            <tbody>
                            {

                                users.map((user) =>

                                <tr>
                                    <td class="tableTh">{ user.name }</td>
                                    <td class="tableTh">{ user.address }</td>
                                    <td class="tableTh">{ user.email }</td>
                                    <td class="tableTh">{ user.phone }</td>
                                    <td class="tableTh">{ user.type }</td>
                                    <td class="tableTh">{this.editButton(user.type,user._id,user.email)}</td>
                                    <td class="tableTh"><button type='button' onClick={() => this.onDelete(user._id)} class="btn btn-outline-danger">Delete</button></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default Users;

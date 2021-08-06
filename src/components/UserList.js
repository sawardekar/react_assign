import React, { Component } from 'react'
import axios from 'axios'

class UserList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             UserLists:[],
             errormsg : ''

        }
    }
    
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')  
        .then(response => {
            console.log(response)
            this.setState({UserLists: response.data})

        }) 
        .catch(error => {
            console.log(error)
            this.setState({errormsg: 'Error retriving data'})

        })
    }
    onDelete(id){
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)  
            .then(response => {
                console.log("delete resposne",response)
                this.setState({UserLists: this.state.UserLists.filter(user=> user.id !== id)}) 
                alert("User data deleted successfully !!") 
            }) 
            .catch(error => {
                console.log(error)
                this.setState({errormsg: 'Error retriving data'})

            })
    }
    render() {
        const { UserLists, errormsg } = this.state
        return (
            <div>
                <div className="bg-info">
                <h2><b data-testid='caption'>list of Users</b></h2>
                <button className="btn btn-primary" style={{position: "absolute",right: "10px",top: "40px"}} onClick={() => this.props.history.push(`/create-users`)}>Add Users</button>
                </div>
                <div className="row m-5">

                {
                    UserLists.length ? 
                    UserLists.map(user => <div className="col-sm-3 mb-5" key={user.id}> <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">
                    {user.name}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{user.phone}</h6>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">{user.website}</p>
                    <span onClick={() => this.props.history.push(`/users/detail/${user.id}`)} className="btn btn-info mr-3 mb-3">Details</span>
                    <span onClick={() => this.props.history.push(`/users/edit/${user.id}`)} className="btn btn-primary mr-3 mb-3">Edit</span>
                    <span onClick={() => this.onDelete(user.id)} className="btn btn-danger">Delete</span>
                    </div>
                  </div></div>) :
                    null
                }
                </div>
                {errormsg ? <div>{errormsg}</div> : null}
            </div>

        )
    }
}

export default UserList

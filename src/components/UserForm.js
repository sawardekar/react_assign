import React, { Component } from 'react'
import axios from 'axios'
class UserForm extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
             name: '',
             phone:'',
             email:'',
             id: this.props.match.params.id || '',
             errormsg : '',
             isInvalid : true,
            inital_details: {}       
        }
    }
    componentDidMount(){
        if (this.state.id){
            axios.get(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)  
            .then(response => {
                console.log(response)
                this.setState({
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                    isInvalid : false,
                    inital_details: response.data
                })

            }) 
            .catch(error => {
                console.log(error)
                this.setState({errormsg: 'Error retriving data'})

            })
        }
    }

    componentDidUpdate() {
        if (this.state.name && this.state.phone && this.state.email && this.state.isInvalid) {
            this.setState({
                isInvalid : false
            });
        }
        else if ((!this.state.name || !this.state.phone || !this.state.email) && !this.state.isInvalid) {
            this.setState({
                isInvalid : true
                });
        }
    }
    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
        if (this.state.id){
            axios.put(`https://jsonplaceholder.typicode.com/users/${this.state.id}`,this.state)  
            .then(response => {
                console.log("put resposne",response)
                this.setState({
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                    id: response.data.id,
                    isInvalid : true,

                })
                alert("User data update Successfully!!")
                this.props.history.push(`/users`)

            }) 
            .catch(error => {
                console.log(error)
                this.setState({errormsg: 'Error retriving data'})

            })
        }else{
            axios.post(`https://jsonplaceholder.typicode.com/users`,this.state)  
            .then(response => {
                console.log("post resposne",response)
                this.setState({
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                    id: response.data.id,
                    isInvalid : true
                })
                alert("User data created Successfully !!")
                this.props.history.push(`/users`)
            }) 
            .catch(error => {
                console.log(error)
                this.setState({errormsg: 'Error retriving data'})

            })
        }
        
    }
    handleButtonClick = () => {
        this.form.reset() 
        if (this.state.id){
            this.setState({
                name: this.state.inital_details.name,
                phone: this.state.inital_details.phone,
                email: this.state.inital_details.email,
                id: this.state.inital_details.id,
                isInvalid : true
            })
        }
        else{
            this.setState({
                name: '',
                phone: '',
                email: '',
                id: '',
                isInvalid : true
            })
        }
        
    }
    render() {
        const {isDetails} = this.props
        const { id, name, email, phone, isInvalid} = this.state
        const labels = {
            'float': 'left',
            'margin': '1px'
        }
        return (
            <div className="table-responsive d-flex justify-content-center m-5">
                <table className="table table-bordered w-50 ">
                <thead>
                    <tr className="bg-success">
                        <th data-testid='caption'>
                        {isDetails ? <> User Detail Form </> : id ? <> User Edit Form </> :<> User Create Form </>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <form onSubmit={this.submitHandler} ref={form => this.form = form}>
                            <div className="form-group">
                                <label htmlFor="username" style={labels}>Name</label><br></br>
                                <input type="text" id="username" className="form-control" name="name" value={name} disabled={isDetails} onChange={this.changeHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="useremail" style={labels}>Email</label><br></br>
                                <input type="text" id="useremail" className="form-control" name="email" value={email} disabled={isDetails} onChange={this.changeHandler}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userphone" style={labels}>Phone</label><br></br>
                                <input type="text" id="userphone" className="form-control" name="phone" value={phone} disabled={isDetails} onChange={this.changeHandler} onBlur={this.changeHandler}/>
                            </div>
                            {!isDetails ? 
                            <>
                            <button type="submit" className="btn btn-primary mr-3" disabled={isInvalid}>{id ? <> Update </> :<> Add </>}</button>
                            <button type="reset" className="btn btn-secondary mr-3" onClick={this.handleButtonClick} >Reset</button>
                            </> : null }
                            <button type="reset" className="btn btn-info" onClick={() => this.props.history.push(`/users`)} >Back</button>
                        </form>
                    </td>
                </tr>
                </tbody>
                </table>
            </div>
        )
    }
}

export default UserForm

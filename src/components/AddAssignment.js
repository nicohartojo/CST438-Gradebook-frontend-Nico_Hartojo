import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        assignmentName: "",
        dueDate: "",
        courseId: ""
      };
    };

  handleSubmit = ( ) => {
    console.log("AddAssignment.handleSubmit");
    const token = Cookies.get('XSRF-TOKEN');
    
    fetch(`${SERVER_URL}/gradebook/${this.state.courseId}` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json',
                     'X-XSRF-TOKEN': token }, 
          body: JSON.stringify({name:this.state.assignmentName,  dueDate: this.state.dueDate})
        } )
    .then(res => {
        if (res.ok) {
          toast.success("Assignment successfully added", {
          position: toast.POSITION.BOTTOM_LEFT
          });
        } else {
          toast.error("Add assignment failed", {
          position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Put http status =' + res.status);
    }})
      .catch(err => {
        toast.error("Add assignment failed", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
      });
 };

 handleNameChange(event) {
  this.setState({assignmentName: event.target.value});
};

handleDateChange(event) {
  this.setState({dueDate: event.target.value})
};

handleIdChange(event) {
  this.setState({courseId: event.target.value});
};
  
  render() {
    return (
      <div>
        <form>
          <label>
            Assignment Name:
            <input name="assignment_name" type="text" defaultValue={this.state.assignmentName} onChange={this.handleNameChange.bind(this)}/>
          </label>
          <br />
          <label>
            Due Date:
            <input name="due_date" type="date" defaultValue={this.state.dueDate} onChange={this.handleDateChange.bind(this)}/>
          </label>
          <br />
          <label>
            Course ID:
            <input name="course_id" type="text" defaultValue={this.state.courseId} onChange={this.handleIdChange.bind(this)}/>
          </label>
          <br />
          <div style={{ height: 400, width: '100%' }}>
            <Button id="Submit" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleSubmit.bind(this)} >
                Submit
            </Button>
          </div>
        </form>
        <ToastContainer autoClose={1500} />   
      </div>
    );
  }
}  

export default AddAssignment;
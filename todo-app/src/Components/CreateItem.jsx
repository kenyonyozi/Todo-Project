import React from "react";
import { Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Lists from "./Lists";

const CreateItem = () => {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState(false);
 
  //updating or adding new todo
  const [isUpdating, setUpdating] = useState('');

  const addUpdate = () => {
    if(isUpdating===''){
      //post
      axios.post('http://localhost:4000/items', {text , done})
      .then((res) => {
        if(res.data.message && res.data.message === 'Todo added successfully'){
          toast.success('Todo created Successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }else{
          toast.error('Todo creation failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })

        }
        setText('')
      })
      .catch((err) => console.log(err))
    }else{
      setUpdating('')
    }
  }
  //get
  useEffect(() =>{
    axios.get('http://localhost:4000/items')
    .then((res) => setTodo(res.data.data.items))
    .catch((err) => console.log(err))
  })
  
  //delete
  const deleteToDo = (_id) => { 
    console.log(_id)
    axios.delete(`http://localhost:4000/items/deleteitem/${_id}`)
    .then((res) => {
      console.log(res.data.message)
      if(res.data.message && res.data.message === 'Todo deleted successfully'){
        toast.success('Todo deleted Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }else{
        toast.error('unable to delete todo', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }
    })
    .catch((err) => console.log(err))
  }

  //update
  const updateToDo = (_id) => {
    console.log(_id)
    setDone(true)


  }
  

  const input ={
    borderColor: "#249225",
  }

  return (
    <div>
      <Container
        style={{
          backgroundColor: "#ABD5AB",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "30%",
          maxWidth: "100%",
          height:"100%",
          marginTop: "1rem",
          border: "1px solid #249225",
        }}
      >
        <div style={{ marginTop: "1rem" }}>
          <h1 style={{ color: "#0C3823"}}>TODOS</h1>
          <hr style={{ color: "1px solid #249225"  }}/>
          </div>
        <div style={{ margin: "2rem" }}>
          <Row className="align-items-center">
            <Col xs="auto" >
                <InputGroup style={{minWidth: "89%"}}>
                  <Form.Control  style={input} 
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                    placeholder="Add a todo"
                    aria-label="Add a todo"
                  />
                  <Button onClick={()=>addUpdate()} type= 'submit' variant="outline-success" >
                  +
                </Button>
                </InputGroup>
                
            </Col>
          </Row>
        </div>
        <div>
          {todo.map(item => <Lists 
          key={item?._id}
          text={item?.text}
          remove={()=>deleteToDo(item?._id)}
          update={()=>updateToDo(item?._id)} 
          done={item?.done}
          />)}
        </div>
        
      </Container>
      <ToastContainer />
    </div>
  );
};

export default CreateItem;

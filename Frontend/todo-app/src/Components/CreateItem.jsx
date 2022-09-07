import React from "react";
import { Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Lists from "./Lists";

const CreateItem = () => {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);
  //updating or adding new todo
  const [isUpdating, setUpdating] = useState('');

  const addUpdate = () => {
    if(isUpdating===''){
      //post
      axios.post('http://localhost:4000/items', {text})
      .then((res) => {
        console.log(res.data)
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
      console.log(res.data)
    })
    .catch((err) => console.log(err))
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
        <div style={{ marginTop: "2rem" }}>
          <Row className="align-items-center">
            <Col xs="auto" >
                <InputGroup style={{minWidth: "89%"}}>
                  <Form.Control  style={input} 
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                    placeholder="Add a todo"
                    aria-label="Add a todo"
                  />
                  <Button onClick={addUpdate} type= 'submit' variant="outline-success" >
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
          remove={()=>deleteToDo(item?._id)} />)}
        </div>
        
      </Container>
    </div>
  );
};

export default CreateItem;

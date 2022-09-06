import React from "react";
import { Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios"
import Lists from "./Lists";

const CreateItem = () => {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);
  //updating or adding new todo
  const [isUpdating, setUpdating] = useState('');

  const addUpdate = () => {
    if(isUpdating===''){
      axios.post('http://localhost:4000/items', {text})
      .then((res) => {
        console.log(res.data.data.items)
        setText('')
      })
      .catch((err) => console.log(err))
    } else{
      setUpdating('')
    }
  }
  useEffect(() =>{
    axios.get('http://localhost:4000/items')
    .then((res) => setTodo(res.data.data.items))
    .catch((err) => console.log(err))
  })


  const deleteToDo = (_id) =>{ 
    
  }
  


  return (
    <div>
      <Container
        style={{
          backgroundColor: "",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: "100%",
          marginTop: "1rem",
          // border: "1px solid red",
        }}
      >
        <div style={{ marginTop: "3rem" }}>
          <Row className="align-items-center">
            <Col xs="auto">
                <InputGroup className="mb-3">
                  <Form.Control
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                    placeholder="Add a todo"
                    aria-label="Add a todo"
                    aria-describedby="basic-addon2"
                  />
                  <Button onClick={addUpdate} type= 'submit' variant="outline-secondary" id="button-addon2">
                    +
                  </Button>
                </InputGroup>
            </Col>
          </Row>
        </div>
        <div>
          {todo.map(item => <Lists key={item?._id} text={item?.text} remove={deleteToDo(item?._id)}/>)}
        </div>
        
      </Container>
    </div>
  );
};

export default CreateItem;

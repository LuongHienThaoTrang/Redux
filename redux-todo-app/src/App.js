import { Typography, Divider } from 'antd';
import './App.css';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import setupServer from './fakeApis';
import { useEffect } from 'react';
// import axios from 'axios'
import { useDispatch } from 'react-redux';
import { fetchTodos } from './components/TodoList/TodosSlice';

if (process.env.NODE_ENV === 'development') {
  setupServer()
}

const { Title } = Typography;

function App() {

  // TEST FAKE API
  // useEffect(() => {
  //   // Sau khi POST
  //   fetch('/api/todos', {
  //     method: 'POST',
  //     body: JSON.stringify({ id: 4, name: 'Learn Redux', completed: false, prioriry: 'High' })
  //   })
  //     .then(response => {
  //       // Thi GET cái POST
  //       fetch('/api/todos')
  //         .then(response => response.json())
  //         .then(todos => console.log(todos))
  //         // Sau khi Update
  //         fetch('/api/updateTodo', {
  //           method: 'POST',
  //           // Dữ liệu cần update
  //           body: JSON.stringify({ id: 4, name: 'Learn Redux Toolkit', completed: true, prioriry: 'High' })
  //         })
  //           .then(response => {
  //             // Thì GET cái Update
  //             fetch('/api/todos')
  //               .then(response => response.json())
  //               .then(todos => console.log(todos))
  //           })
  //     })


  //   // Cách 1: Dùng fetch get fake api
  //   // Đường dẫn khi nãy ta fakeApis
  //   // fetch('/api/todos')
  //   //   .then(response => response.json())
  //   //   .then(todos => console.log(todos))

  //   // Cách 2: Dùng thư viện axios get fake api
  //   // axios.get('/api/todos')
  //   //   .then(response => console.log(response))
  // }, [])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  return (
    <div
      style={{
        width: 500,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        height: '90vh',
      }}
    >
      <Title style={{ textAlign: 'center' }}>TODO APP with REDUX</Title>
      <Filters />
      <Divider />
      <TodoList />
    </div>
  );
}

export default App;

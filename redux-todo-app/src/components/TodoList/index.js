import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
// import { addTodo } from '../../redux/actions'
import { todosRemainingSelector } from './../../redux/selectors';
import todoListSlice from './TodosSlice'

function TodoList() {
  const [name, setName] = useState('')
  const [prioriry, setPrioriry] = useState('Medium')
  const inputRef = useRef()
  // Lấy ra dispatch
  const dispatch = useDispatch()
  // Lấy ra state
  const todoList = useSelector(todosRemainingSelector)
  // Lấy ra state của seach nhưng đã dùng reselector 
  // const searchText = useSelector(searchTextSelector)

  const handleAddButtonClick = () => {
    // Nếu input '' thì không dispatch
    if(!(name === '')) {
    //   dispatch(addTodo({
    //     id: uuidv4(),
    //     name: name,
    //     prioriry: prioriry,
    //     completed: false
    //   }))
    //   // Clear input, focus
    //   setName('')
    //   setPrioriry('Medium')
    //   inputRef.current.focus()
    // }

    // Cách 2: Viết Redux Toolkit
      dispatch(todoListSlice.actions.addTodo({
        id: uuidv4(),
        name: name,
        prioriry: prioriry,
        completed: false
      }))
      // Clear input, focus
      setName('')
      setPrioriry('Medium')
      inputRef.current.focus()
    }
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map(todo => <Todo key={todo.id} id={todo.id} name={todo.name} prioriry={todo.prioriry} completed={todo.completed} />)}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input
            ref={inputRef} 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Select defaultValue="Medium" value={prioriry} onChange={value => setPrioriry(value)}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}

export default TodoList

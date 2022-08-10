import { Row, Tag, Checkbox } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
// import { toggleStatus } from '../../redux/actions';
import todoListSlice, { updateTodo } from '../TodoList/TodosSlice';

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

export default function Todo({ name, prioriry, completed, id }) {
  const [checked, setChecked] = useState(completed);
  const dispatch = useDispatch()

  const toggleCheckbox = () => {
    setChecked(!checked);
    // Cách 1: Viết Redux Core
    // dispatch(toggleStatus(id));

    // Cách 2: Viết Redux Toolkit => Cách 1 và cách 2 chỉ update toggle lên store
    // dispatch(todoListSlice.actions.toggleStatus(id));

    // Cách 3: Viết Dispatch Thunk Action creators để nó post lên api và update toggle vào db
    dispatch(updateTodo(id))
  };

  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0 }}>
        {prioriry}
      </Tag>
    </Row>
  );
}

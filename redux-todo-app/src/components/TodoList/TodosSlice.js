
const initState = [
    // todoList sẽ là [], mỗi tp trong todoList nó tượng trưng cho việc cần làm
    // Nên có id để phân biệt
    { id: 1, name: 'Learn HTML, CSS', completed: false, prioriry: 'Medium' },
    { id: 2, name: 'Learn JavaScript', completed: true, prioriry: 'High' },
    { id: 3, name: 'Learn ReactJS', completed: false, prioriry: 'Low' }
]

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        case 'todoList/addTodo':
            return [...state, action.payload]
        
        case 'todoList/toggleStatus':
            return state.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
    
        default:
            return state
    }
}

export default todoListReducer
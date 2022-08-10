
// const initState = [
//     // todoList sẽ là [], mỗi tp trong todoList nó tượng trưng cho việc cần làm
//     // Nên có id để phân biệt
//     { id: 1, name: 'Learn HTML, CSS', completed: false, prioriry: 'Medium' },
//     { id: 2, name: 'Learn JavaScript', completed: true, prioriry: 'High' },
//     { id: 3, name: 'Learn ReactJS', completed: false, prioriry: 'Low' }
// ]

// const todoListReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'todoList/addTodo':
//             return [...state, action.payload]
        
//         case 'todoList/toggleStatus':
//             return state.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
    
//         default:
//             return state
//     }
// }

// export default todoListReducer

// Cách 2: Viết Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
    name: "todoList",
    initialState: [
        { id: 1, name: 'Learn HTML, CSS', completed: false, prioriry: 'Medium' },
        { id: 2, name: 'Learn JavaScript', completed: true, prioriry: 'High' },
        { id: 3, name: 'Learn ReactJS', completed: false, prioriry: 'Low' }
    ],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        toggleStatus: (state, action) => {
            const currentTodo = state.find(todo => todo.id === action.payload)
            // Dùng find trả về 1 element
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed
            }
        }
    }
})

export default todoListSlice
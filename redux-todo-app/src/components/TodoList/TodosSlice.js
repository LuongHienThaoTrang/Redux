// Cách 1: Viết Redux Core
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
// import { createSlice } from "@reduxjs/toolkit";

// const todoListSlice = createSlice({
//     name: "todoList",
//     initialState: [
//         { id: 1, name: 'Learn HTML, CSS', completed: false, prioriry: 'Medium' },
//         { id: 2, name: 'Learn JavaScript', completed: true, prioriry: 'High' },
//         { id: 3, name: 'Learn ReactJS', completed: false, prioriry: 'Low' }
//     ],
//     reducers: {
//         addTodo: (state, action) => {
//             state.push(action.payload)
//         },
//         toggleStatus: (state, action) => {
//             const currentTodo = state.find(todo => todo.id === action.payload)
//             // Dùng find trả về 1 element
//             if (currentTodo) {
//                 currentTodo.completed = !currentTodo.completed
//             }
//         }
//     }
// })


// Cách 3: Viết Redux Thunk
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
    name: "todoList",
    //Ta cần viết 1 Thunk Function dùng để lấy dữ liệu từ phía server
    initialState: { status: 'idle', todos: [] }, // [] => { status: 'Dùng để lưu trữ trạng thái request trong fetch createAsyncThunk', todos: [] }
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        toggleStatus: (state, action) => {
            const currentTodo = state.todos.find(todo => todo.id === action.payload)
            // Dùng find trả về 1 element
            if (currentTodo) {
                currentTodo.completed = !currentTodo.completed
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state, action) => {
            // case pending: update status
            state.status = 'loading'
            // và ta sẽ sd status này ở UI để kiểm tra request: đang được request success hay error 
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            // Cập nhật lại todo
            state.todos = action.payload
            // Đã thực hiện request xong và pending nó không có gì khác
            state.status = 'idle'
        })
        .addCase(addNewTodo.fulfilled, (state, action) => {
            state.todos.push(action.payload)
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
            let currentTodo = state.todos.find(todo => todo.id === action.payload)
            currentTodo = action.payload
        })
    }
})

/**
 * Mối createAsyncThunk sẽ tạo 3 action tương ứng
 * pending:'users/requestStatus/pending'
 * fulfilled:'users/requestStatus/fulfilled'
 * rejected:'users/requestStatus/rejected'
 */
// Tạo ra Thunk Function: createAsyncThunk
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch('/api/todos')
    // Chuyển JSON -> JavaScript
    const data = await res.json()
    return data.todos
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
    const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
    })
    // Chuyển JSON -> JavaScript
    const data = await res.json()
    return data.todos
})

// Update todo là update toggleCheckbox lên db
export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
    const res = await fetch('/api/updateTodo', {
        method: 'POST',
        body: JSON.stringify(updatedTodo)
    })
    // Chuyển JSON -> JavaScript
    const data = await res.json()
    console.log('[updateTodo]', {data})
    return data.todos
})

export default todoListSlice 




/** 
 * action (Object) && action creators () => { return action }
 * thunk action (function) && thunk action creators () => { return thunk action }
*/

// Viết ví dụ về Thunk Function - Thunk Action
// export function addTodos(todo) { //ta truyền data vào thunk action creators
//     // getState dùng để lấy ra store hiện tại
//     return function addTodosThunk(dispatch, getState) {
//         console.log('[addTodoThunk]', getState());
//         // Thì trong thunk action có thể truy xuất
//         console.log({ todo });
//         todo.name = 'Learn Redux Update'
//         dispatch(todoListSlice.actions.addTodo(todo))
//         console.log('[addTodosThunk after]', getState());
//     }
// }
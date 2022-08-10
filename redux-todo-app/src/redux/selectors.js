// Cách 1: Viết Redux Core
// import { createSelector } from 'reselect'

// Cách 2: Viết Redux Toolkit
import { createSelector } from '@reduxjs/toolkit'

// Lấy ra state
export const todoListSelector = state => state.todoList
export const searchTextSelector = state => state.filters.search 
export const statusFilterSelector = state => state.filters.status
export const prioriryFilterSelector = state => state.filters.prioriry 

// Khi ta có 1 selector mà phụ thuộc 1 selector khác thì ta dùng thư viện reselector
export const todosRemainingSelector = createSelector(
    todoListSelector,
    searchTextSelector,
    statusFilterSelector,
    prioriryFilterSelector,
    // Tham số trong callback: todoList === state.todoList, searchText === state.filters.search

    //**** Khi viết redux toolkit: thì những giá trị tham số trong callback nếu có sự thay đổi mới bị tính toán lại như react hook
    (todoList, searchText, statusFilter, prioriryFilter) => {
        
        // Dữ liệu của status có 3 giá trị: 'All', 'Completed', 'Todo'
        // 1. Kiểm tra: nếu là 'All' => Thì không xét đk completed
        // 2. Kiểm tra: nếu là 'Completed' or 'Todo' => Thì xét đk completed
        return todoList.filter(todo => {
            if (statusFilter === 'All') {
                // Lúc đầu prioriryFilter là [] nên nó sẽ chạy đk 2
                // Nếu có phần tử thì chạy đk đầu
                // Dùng includes thì phân tử nào lớn sẽ gọi đến includes
                return prioriryFilter.length > 0 
                    ? todo.name.includes(searchText) && prioriryFilter.includes(todo.prioriry) //todo.prioriry có nằm trong danh sách mảng đó k có thì trả về
                    : todo.name.includes(searchText)
            }

            return (
                todo.name.includes(searchText) && 
                (statusFilter === 'Completed' ? todo.completed === true : todo.completed === false) &&
                (prioriryFilter.length > 0 ? todo.name.includes(searchText) && prioriryFilter.includes(todo.prioriry) : todo.name.includes(searchText))

            )

            
        })
    }  
)



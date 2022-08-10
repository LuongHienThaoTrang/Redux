
// Cách 1: Viết Redux Core
export const addTodo = payload => ({
    type: 'todoList/addTodo',
    payload
})

export const toggleStatus = payload => ({
    type: 'todoList/toggleStatus',
    payload //payload là id của th đang check
})

export const searchFilterChange = payload => ({
    type: 'filters/searchFilterChange',
    payload
})

export const statusFilterChange = payload => ({
    type: 'filters/statusFilterChange',
    payload
})

export const prioriryFilterChange = payload => ({
    type: 'filters/prioriryFilterChange',
    payload
})


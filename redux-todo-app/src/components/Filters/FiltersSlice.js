
// const initState = {
//     search: '',
//     status: 'All', //mặc định là check radio của All
//     prioriry: [], // multi select lựa chọn được nhiều nên lưu []
// }

// const filtersReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'filters/searchFilterChange':
//             return {
//                 ...state,
//                 search: action.payload
//             }
        
//             case 'filters/statusFilterChange':
//                 return {
//                     ...state,
//                     status: action.payload
//                 }

//             case 'filters/prioriryFilterChange':
//                 return {
//                     ...state,
//                     prioriry: action.payload
//                 }
    
//         default:
//             return state
//     }
// }

// export default filtersReducer

// Cách 2: Viết Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All', //mặc định là check radio của All
        prioriry: [], // multi select lựa chọn được nhiều nên lưu []
    },
    reducers: {
        // Có bao nhiêu câu lệnh case trong reducer của redux core thì tương ứng với trong đây
        searchFilterChange: (state, action) => {
            state.search = action.payload
        }, // => Nó sẽ tạo cho chúng ta 1 Action với type =  với name ta khai báo trên / và tên key, nó tạo cho ta 1 action như của reducer
        // { type: 'filters/searchFilterChange' }
        statusFilterChange: (state, action) => {
            state.status = action.payload
        },
        prioriryFilterChange: (state, action) => {
            state.prioriry = action.payload
        }
    }
})

export default filtersSlice
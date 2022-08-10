import { createServer, Model } from "miragejs"

function setupServer() {
    let server = createServer({
        models: {
            todos: Model
        },
        routes() {
            this.get('/api/todos', (schema) => {
                // schema sẽ get hết dữ liệu trong db fake này
                return schema.todos.all()
            })

            // request này sẽ chứa dữ liệu để ta gửi lên server
            this.post('/api/todos', (schema, request) => {
                const payload = JSON.parse(request.requestBody)
                // Tạo mới 1 cái dữ liệu trong db
                return schema.todos.create(payload)
            })

            // update toggle
            this.post('/api/updateTodo', (schema, request) => {
                // Bởi vì id nó k có {} nên k dùng payload
                const id = JSON.parse(request.requestBody)
                // Dựa trên id requestBody để tìm trong db xem todo nào tương ứng id đó
                const currentTodo = schema.todos.find(id)
                // update theo giá trị đã được submit lên
                currentTodo.update({completed: !currentTodo.completed})
                return currentTodo
            })
        }
    })

    return (
        <div></div>
    )
}

export default setupServer
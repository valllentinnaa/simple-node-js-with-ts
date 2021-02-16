import {Router} from 'express';
import {Todo} from '../models/todo';

let todos: Todo[] = [];

type RequestBody = {
    text: string
};

type RequestParams = {
    todoId: string
};

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({todos});
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    }

    todos.push(newTodo)

    res.status(201).json({message: 'Added Todo', todo: newTodo});
});

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const id = req.params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === id)
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        };
        return res.status(200).json({message: 'Updated todo', todos});
    }
    res.status(404).json({message: 'Invalid ID'});
});

router.delete('/todo/:todoId', (req, res, next) => {
    const id = req.params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== id)
    res.status(200).json({message: 'Deleted Todo', todos});
});

export default router;
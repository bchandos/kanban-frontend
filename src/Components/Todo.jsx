import React from 'react';
import { editTodoName } from '../api/api';
import EditableText from './EditableText';

class Todo extends React.Component {

    render() {
        
        return (
            <div className="todo">
                <input 
                    type="checkbox" 
                    onChange={this.props.toggleCompletion} 
                    data-todo-id={this.props.todo.id}
                    checked={this.props.todo.complete} 
                    name={"todo-complete-"+this.props.todo.id} 
                    id={"todo-complete-"+this.props.todo.id}
                />
                <EditableText 
                    value={this.props.todo.name} 
                    id={this.props.todo.id} 
                    apiRoute={editTodoName}
                    defaultText='New Todo'
                />
                <i 
                    className="material-icons icon" 
                    data-todo-id={this.props.todo.id} 
                    onClick={this.props.deleteTodo}
                >
                    delete
                </i>
            </div>
        );
    }
}

export default Todo;
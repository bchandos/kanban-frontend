import React from 'react';
import EditableText from './EditableText';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: this.props.todo.complete,
        }
    }

    toggleCompletion = async (e) => {
        const response = await fetch(`http://localhost:3333/todo/${this.props.todo.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.props.todo.id,
                    complete: e.currentTarget.checked,
                })
            });
        const json = await response.json();
        this.setState({
            complete: json.complete,
        })
    }

    render() {
        
        return (
            <div className="todo">
                <input 
                    type="checkbox" 
                    onChange={this.toggleCompletion} 
                    checked={this.state.complete} 
                    name={"todo-complete-"+this.props.todo.id} 
                    id={"todo-complete-"+this.props.todo.id}
                />
                <EditableText 
                    value={this.props.todo.name} 
                    id={this.props.todo.id} 
                    apiRoute="http://localhost:3333/todo/"
                />
            </div>
        );
    }
}

export default Todo;
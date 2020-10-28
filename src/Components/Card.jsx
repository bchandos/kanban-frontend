import React from 'react';
import EditableText from './EditableText';
import Todo from './Todo';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: this.props.card.contents || '',
            isLoaded: false,
            todos: [],
        }
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3333/card/${this.props.card.id}/todos`);
        const json = await response.json();

        this.setState({
            isLoaded: true,
            todos: json,
        })
    }

    updateContents = async (e) => {
        const response = await fetch(`http://localhost:3333/card/${this.props.card.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.props.id,
                    contents: e.currentTarget.value,
                })
            });
        const json = await response.json();
        this.setState({
            contents: json.contents,
        })
    }

    addTodo = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3333/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'New Todo',
                cardId: this.props.card.id,
            })
        })
        const json = await response.json();
        this.setState({
            isLoaded: true,
            todos: json,
        })
    }

    deleteTodo = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.todoId;
        const response = await fetch(`http://localhost:3333/todo/${id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (json.status == 'ok') {
            this.setState({
                todos: this.state.todos.filter(t => t.id != id),
            })
        }
    }

    toggleCompletion = async (e) => {
        const id = e.currentTarget.dataset.todoId;
        const response = await fetch(`http://localhost:3333/todo/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    complete: e.currentTarget.checked,
                })
            });
        const json = await response.json();
        const idx = this.state.todos.findIndex(t => t.id === json.id);

        this.setState({
            todos: [
                ...this.state.todos.slice(0, idx),
                json,
                ...this.state.todos.slice(idx+1)            
            ]
        });
    }

    render() {
        const completion = (this.state.todos.filter(t => t.complete).length / this.state.todos.length) || 0;
        const completedPercentage = Math.round(completion * 100);
        
        const todos = this.state.todos.map( (todo, index) => 
            <Todo 
                key={todo.id}
                todo={todo}
                index={index}
                toggleCompletion={this.toggleCompletion}
                deleteTodo={this.deleteTodo}
            />
        );
        if ((!this.props.hideComplete) || (this.props.hideComplete && completion !== 1)) {
            return (
                <div 
                    className="w3-card w3-hover-shadow w3-round"
                    draggable="true" 
                    data-index={this.props.index}
                    data-card-id={this.props.card.id}
                    data-sort-order={this.props.card.sortOrder}
                    onDragStart={this.props.onDragStart}
                    onDragOver={this.props.onDragOver}
                    onDrop={this.props.onDrop}
                    onDragLeave={this.props.onDragLeave}
                    onDragEnd={this.props.onDragEnd}
                >
                    <div 
                        className="w3-panel" 
                    >
                        <div className="w3-panel card-header">
                            <EditableText 
                                value={this.props.card.name} 
                                id={this.props.card.id} 
                                apiRoute="http://localhost:3333/card/"
                            />
                            <i className="material-icons icon" onClick={this.props.deleteCard} data-card-id={this.props.card.id}>
                                delete
                            </i>
                        </div>
                    </div>
                    <div className="w3-panel">
                        <div className="w3-light-grey">
                            <div className="w3-container w3-green w3-center" style={{width: `${completedPercentage}%`}}>
                                {completedPercentage}%
                            </div>
                        </div> 
                        <textarea 
                            className="w3-block w3-margin-top w3-margin-bottom"
                            name={"card-content-" + this.props.card.id}
                            id={"card-content-" + this.props.card.id}
                            onChange={this.updateContents}
                            value={this.state.contents}
                        >
                        </textarea>
                        {todos}
                        <button className="w3-btn w3-light-gray w3-block w3-margin-top w3-margin-bottom" onClick={this.addTodo}>
                        + Add New Todo
                    </button>
                    </div>
                </div>
            );
        } else {
            return(<div></div>);
        }
    }
}

export default Card;
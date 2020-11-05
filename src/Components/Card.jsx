import React from 'react';
import { addTodo, deleteTodo, editCardName, getTodos, toggleTodo, uploadCardContents } from '../api/api';
import EditableText from './EditableText';
import Todo from './Todo';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: this.props.card.contents || '',
            isLoaded: false,
            todos: [],
            keyCounter: 0
        }
    }

    async componentDidMount() {
        const json = await getTodos(this.props.card.id);

        this.setState({
            isLoaded: true,
            todos: json,
        })
    }

    updateContent = (e) => {
        e.persist();
        this.setState((state) => ({
            contents: e.target.value,
            keyCounter: state.keyCounter + 1,
        }));
        // Don't send an API call on every keystroke, unless that keystroke
        // clears the field
        if (this.state.keyCounter >= 15 || e.currentTarget.value === '') {
            this.uploadContents(e);
            this.setState({
                keyCounter: 0,
            })
        }
    }

    uploadContents = async (e) => {
        const json = await uploadCardContents(this.props.card, e.currentTarget.value);
        this.setState({
            contents: json.contents,
        })
    }

    addTodo = async (e) => {
        e.preventDefault();
        const json = await addTodo(this.props.card.id);
        this.setState({
            isLoaded: true,
            todos: json,
        })
    }

    deleteTodo = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.todoId;
        const json = await deleteTodo(id);
        if (json.status == 'ok') {
            this.setState((state) => ({
                todos: state.todos.filter(t => t.id != id),
            }));
        }
    }

    toggleCompletion = async (e) => {
        const id = e.currentTarget.dataset.todoId;
        const json = await toggleTodo(id, e.currentTarget.checked);
        const idx = this.state.todos.findIndex(t => t.id === json.id);

        this.setState((state) => ({
            todos: [
                ...state.todos.slice(0, idx),
                json,
                ...state.todos.slice(idx+1)            
            ]
        }));
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
                    className="w3-card w3-round"
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
                                apiRoute={editCardName}
                                defaultText='New Card'
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
                            onBlur={this.uploadContents}
                            onChange={this.updateContent}
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
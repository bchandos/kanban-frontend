import React from 'react';
import { editTodoName, uploadTodoNote } from '../api/api';
import EditableText from './EditableText';

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notesVisible: !!this.props.todo.note,
            note: this.props.todo.note || '',
            keyCounter: 0,
        }
    }

    toggleTodoNotes = async (e) => {
        this.setState((state) => ({ notesVisible: !state.notesVisible }))
    }

    uploadNotes = async (e) => {
        e.persist();
        const json = await uploadTodoNote(this.props.todo, e.currentTarget.value);
        // Only set the state when the input is blurred to avoid slow connection
        // overwriting the value as you're typing
        if (e.nativeEvent.type === 'blur') {
            this.setState({
                note: json.note,
            })
        }
    }
    
    updateNotes = async (e) => {
        e.persist();
        this.setState((state) => ({
            note: e.target.value,
            keyCounter: state.keyCounter + 1,
        }));
        // Don't send an API call on every keystroke, unless that keystroke
        // clears the field
        if (this.state.keyCounter >= 15 || e.currentTarget.value === '') {
            this.uploadNotes(e);
            this.setState({
                keyCounter: 0,
            })
        }
    }

    render() {
        let notes;
        if (this.state.notesVisible) {
            notes = (
                <textarea 
                    className="todo-note"
                    name={"todo-note-" + this.props.todo.id}
                    id={"todo-note-" + this.props.todo.id}
                    onBlur={this.uploadNotes}
                    onChange={this.updateNotes}
                    value={this.state.note}
                ></textarea>
            )
        } else {
            notes = null;
        }
        return (
            <div className="todo-container">
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
                        defaultText='New todo'
                    />
                    <i 
                        className="material-icons icon" 
                        data-todo-id={this.props.todo.id} 
                        onClick={this.props.deleteTodo}
                    >
                        delete
                    </i>
                    <i 
                        className="material-icons icon" 
                        data-todo-id={this.props.todo.id} 
                        onClick={this.toggleTodoNotes}
                    >
                        notes
                    </i>
                </div>
                {notes}
            </div>
        );
    }
}

export default Todo;
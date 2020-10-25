import React from 'react';

class EditableText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editMode: false,
        }
    
        this.nameInput = React.createRef();
    }

    componentDidUpdate() {
        // When in edit mode, set the input to focused
        if (this.state.editMode) {
            this.nameInput.current.focus();
        }
    }

    editText = (e) => {
        // Set state to edit mode and log the old value
        this.setState({
            editMode: true,
            oldValue: e.target.value,
        });
    }
    
    exitText = (e) => {
        // Exiting edit mode should set the old value
        this.setState({
            editMode: false,
            value: this.state.oldValue,
        });
    }

    handleInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    keyUp = (e) => {
        if (e.key === 'Enter') {
            this.done();
        }
    }

    done = async (e) => {
        const response = await fetch(`${this.props.apiRoute}/${this.props.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.id,
                name: this.state.value,
            })
        });
        const json = await response.json();
        this.setState({
            editMode: false,
            value: json.name,
        })
    }

    render() {
        let icons;
        if (this.state.editMode) {
            icons = (
                    <span>
                        <i className="material-icons icon" onClick={this.done}>done</i>
                        <i className="material-icons icon" onClick={this.exitText}>clear</i>
                    </span>);
        } else {
            icons = (
                <span>
                    <i className="material-icons icon" onClick={this.editText}>edit</i>
                </span>);
        }

        return (
            <div className="editable">
                <input 
                    type="text" 
                    value={this.state.value} 
                    onChange={this.handleInput} 
                    disabled={!this.state.editMode}
                    ref={this.nameInput}
                    onKeyUp={this.keyUp}
                />
                <div>
                    {icons}
                </div>
            </div>
        );
    }
}

export default EditableText;
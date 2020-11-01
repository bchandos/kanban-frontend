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
        // If the value is the default, select it for easy replacing
        if (this.nameInput.current.value === this.props.defaultText) {
            this.nameInput.current.select();
        }
    }

    editText = (e) => {
        // Set state to edit mode and log the old value
        this.setState({
            editMode: true,
            oldValue: e.currentTarget.value,
        });
    }
    
    exitText = (e) => {
        // Exiting edit mode should set the old value
        this.setState((state) => ({
            editMode: false,
            value: state.oldValue,
        }));
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
                <div className="w3-display-right">
                    <span>
                        <i 
                            className="material-icons icon" 
                            onClick={this.done}
                            title="Save changes"
                        >
                            done
                        </i>
                        <i 
                            className="material-icons icon" 
                            onClick={this.exitText}
                            title="Cancel"
                        >
                            clear
                        </i>
                    </span>
                </div>);
        } else {
            icons = (
                <div className="w3-display-hover w3-display-right w3-round">
                    <span>
                        <i 
                            className="material-icons icon" 
                            onClick={this.editText}
                            title="Edit"
                        >
                            edit
                        </i>
                    </span>
                </div>);
        }

        return (
            <div className="editable w3-padding-small w3-display-container" onDoubleClick={this.editText}>
                <input 
                    className="w3-input input"
                    type="text" 
                    value={this.state.value} 
                    onChange={this.handleInput} 
                    disabled={!this.state.editMode}
                    ref={this.nameInput}
                    onKeyUp={this.keyUp}
                />
                {icons}
            </div>
        );
    }
}

export default EditableText;
import React from 'react';

class EditableSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editMode: false,
            options: this.props.options
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

    handleDropdown = (e) => {
        const dropDown = document.getElementById('dropdown')
        dropDown.classList.toggle('w3-show');
    }

    handleBlur = (e) => {
        const dropDown = document.getElementById('dropdown')
        dropDown.classList.remove('w3-show');
    }

    handleKeyScroll = (e) => {
        // e.preventDefault();
        // console.log(e.key);
    }

    keyUp = (e) => {
        if (e.key === 'Enter') {
            this.done();
        }
    }

    done = async (e) => {
        const response = await fetch(`http://${import.meta.env.VITE_HOST_IP}:3333/${this.props.apiRoute}/${this.props.id}`,
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
        const idx = this.state.options.findIndex(o => o.id === json.id);
        this.setState((state) => ({
            editMode: false,
            value: json.name,
            options: [
                ...state.options.slice(0, idx),
                json,
                ...state.options.slice(idx+1)
            ]
        }));
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

        const options = this.state.options.map((item) => {
            if (item.id === this.props.id) {
                return (
                    <div 
                        className="w3-padding w3-hover-light-gray dropdown-item"
                        key={item.id} 
                        data-value={item.id}
                        onClick={this.props.handleSelect}
                    >
                        <span className="w3-bar-item w3-middle">
                            {item.name}
                        </span>
                        <i className="material-icons icon">check</i>
                    </div>
                    )
            } else {
                return (
                    <div 
                        className="w3-padding w3-hover-light-gray dropdown-item"
                        key={item.id} 
                        data-value={item.id}
                        onClick={this.props.handleSelect}
                    >
                        <span className="w3-bar-item w3-middle">
                            {item.name}
                        </span> 
                    </div>
                    )
            }
        });

        return (
            <div className="flex-grow">
                <div className="flex-container">
                    <div className="editable w3-padding-small w3-display-container flex-grow" onDoubleClick={this.editText}>
                        <input 
                            className="w3-input input w3-large"
                            type="text" 
                            value={this.state.value} 
                            onChange={this.handleInput} 
                            disabled={!this.state.editMode}
                            ref={this.nameInput}
                            onKeyUp={this.keyUp}
                        />
                        {icons}
                    </div>
                    <div className="w3-dropdown-click">
                        <button 
                            className="w3-button" 
                            onClick={this.handleDropdown}
                            // onBlur={this.handleBlur}
                            // onKeyDown={this.handleKeyScroll}
                        >
                                <i className="material-icons">arrow_drop_down</i>
                        </button>
                    </div>
                </div>
                <div id="dropdown" className="w3-dropdown-content w3-border w3-card" style={{width: '100%'}}>
                    {options}
                </div>
            </div>
        );
    }
}

export default EditableSelect;
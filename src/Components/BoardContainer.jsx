import React from 'react';
import Board from './Board';
import EditableSelect from './EditableSelect';

class BoardContainer extends React.Component {
    
    state = {
        boards: [],
        selectedBoard: {},
        inputValue: '',
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3333/board/`);
        const json = await response.json()

        const lastBoard = localStorage.getItem('boardId');
        let selectedBoard;
        if (lastBoard) {
            selectedBoard = json.find(b => b.id == lastBoard);
        } else {
            selectedBoard = json[0]
        }

        this.setState({
            boards: json,
            selectedBoard: selectedBoard,
        })
    }

    addBoard = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3333/board`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.inputValue || 'New Board',
            })
        })
        const json = await response.json();
        this.setState((state) => ({
            boards: [...state.boards, json],
            inputValue: '',
            selectedBoard: json,
        }));
    }

    handleInput = (e) => {
        this.setState({
            inputValue: e.currentTarget.value,
        });
    }

    handleSelect = (e) => {
        e.persist();
        this.setState((state) => ({
            selectedBoard: state.boards.find(b => b.id == e.target.dataset.value),
        }));
        localStorage.setItem('boardId', e.target.dataset.value);
    }
  
    render() {
        return (
            <div className="w3-container">
                <div className="flex-container">
                    <EditableSelect 
                        key={this.state.selectedBoard.name}
                        value={this.state.selectedBoard.name}
                        obj={this.state.selectedBoard}
                        options={this.state.boards}
                        id={this.state.selectedBoard.id}
                        apiRoute="http://localhost:3333/board/"
                        handleSelect={this.handleSelect}
                        defaultText='New Board'
                    />
                    <button className="w3-btn" onClick={this.addBoard}>
                        <i className="material-icons">add</i>
                    </button>
                </div>
                <Board key={this.state.selectedBoard.id} boardId={this.state.selectedBoard.id}/>
            </div>
        );
    }
}

export default BoardContainer;
import React from 'react';
import Board from './Board';

class BoardContainer extends React.Component {
    
    state = {
        boards: [],
        selectedBoard: 1,
        inputValue: '',
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3333/board/`);
        const json = await response.json()
        this.setState({
            boards: json,
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
        this.setState({
            boards: [...this.state.boards, json],
            inputValue: '',
            selectedBoard: json.id,
        })
    }

    handleInput = (e) => {
        this.setState({
            inputValue: e.currentTarget.value,
        });
    }

    handleSelect = (e) => {
        e.preventDefault();
        this.setState({
            selectedBoard: e.currentTarget.value,
        })
    }
  
    render() {
        const options = this.state.boards.map((board) => {
            if (board.id === this.props.selectedBoard) {
                return <option key={board.id} value={board.id} selected>{board.name}</option>
            } else {
                return <option key={board.id} value={board.id}>{board.name}</option>
            }
        });

        return (
            <div className="w3-container">
                <select name="board-select" onChange={this.handleSelect}>
                    {options}
                </select>
                <div className="w3-panel">
                    <input type="text" value={this.state.inputValue} onChange={this.handleInput}></input>
                    <button className="btn" onClick={this.addBoard}>Add Board</button>
                </div>
                <Board key={this.state.selectedBoard} boardId={this.state.selectedBoard}/>
            </div>
        );
    }
}

export default BoardContainer;
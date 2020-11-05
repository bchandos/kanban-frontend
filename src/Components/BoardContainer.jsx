import React from 'react';
import Board from './Board';
import EditableSelect from './EditableSelect';

import { getBoards, addBoard, editBoardName } from '../api/api';

class BoardContainer extends React.Component {
    
    state = {
        boards: [],
        selectedBoard: {},
        inputValue: '',
    }

    async componentDidMount() {
        const json = await getBoards();
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
        const json = await addBoard();
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
                        apiRoute={editBoardName}
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
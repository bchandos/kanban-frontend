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
        let json;
        let selectedBoard;
        json = await getBoards(this.props.user.id);
        const lastBoard = localStorage.getItem('boardId');
        if (json.length) {
            if (lastBoard) {
                selectedBoard = json.find(b => b.id == lastBoard);
            } else {
                selectedBoard = json[0];
            }
        } else {
            const newBoard = await addBoard(this.props.user.id);
            json = [newBoard];
            selectedBoard = newBoard;
        }

        this.setState({
            boards: json,
            selectedBoard: selectedBoard,
        })
    }

    handleAddBoard = async (e) => {
        e.preventDefault();
        const json = await addBoard(this.props.user.id);
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

    logout = (e) => {
        e.preventDefault();
        localStorage.setItem('jwt', '');
        this.props.verifyToken();
    }
  
    render() {
        return (
            <div className="margin-bottom">
                <div className="w3-container w3-deep-purple">
                    <div className="flex-container space-between">
                        <h1>You Kan...ban!</h1>
                        <ul className="nav-menu">
                            <li className="w3-margin-left w3-margin-right">
                                <a href="#">{this.props.user.name}</a>
                            </li>
                            { (this.props.user.admin ? <li className="w3-margin-left w3-margin-right"><a href="#">Admin</a></li> : null) }
                            <li className="w3-margin-left w3-margin-right"><a href="#" onClick={this.logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
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
                    <button className="w3-btn" onClick={this.handleAddBoard}>
                        <i className="material-icons">add</i>
                    </button>
                </div>
                <Board key={this.state.selectedBoard.id} boardId={this.state.selectedBoard.id}/>
            </div>
        );
    }
}

export default BoardContainer;
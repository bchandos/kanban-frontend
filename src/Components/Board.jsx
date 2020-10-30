import React from 'react';
import Lane from './Lane';

class Board extends React.Component {
    
    state = {
        error: null,
        isLoaded: false,
        lanes: [],
        inputValue: '',
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3333/board/${this.props.boardId}/lanes`);
        const json = await response.json()
        this.setState({
            isLoaded: true,
            lanes: json,
        })
    }

    addLane = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3333/lane`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.inputValue || 'New Lane',
                boardId: this.props.boardId,
            })
        })
        const json = await response.json();
        this.setState({
            isLoaded: true,
            lanes: [...this.state.lanes, json],
            inputValue: '',
        })
    }

    deleteLane = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.laneId;
        const response = await fetch(`http://localhost:3333/lane/${id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (json.status == 'ok') {
            this.setState({
                lanes: this.state.lanes.filter(l => l.id != id),
            })
        }
    }

    handleInput = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    render() {
        const { error, isLoaded, lanes } = this.state;
        const allLanes = lanes.map((lane) => 
            <Lane 
                key={lane.id} 
                lane={lane}
                deleteLane={this.deleteLane}
            />
        )
        return (
            <div className="w3-container">
                <div className="w3-panel">
                    <input type="text" value={this.state.inputValue} onChange={this.handleInput}></input>
                    <button className="btn" onClick={this.addLane}>Add Lane</button>
                </div>
                <div className="lanes">
                    {allLanes}
                </div>
            </div>
        );
    }
}

export default Board;
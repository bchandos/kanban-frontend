import React from 'react';
import Lane from './Lane';

class Board extends React.Component {
    
    state = {
        error: null,
        isLoaded: false,
        lanes: [],
        inputValue: '',
        dragAndDrop: {
            draggedFrom: null,
            draggedTo: null,
            isDragging: false,
            originalOrder: [],
            updatedOrder: []
        },
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
        this.setState((state) => ({
            isLoaded: true,
            lanes: [...state.lanes, json],
            inputValue: '',
        }));
    }

    deleteLane = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.laneId;
        const response = await fetch(`http://localhost:3333/lane/${id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (json.status == 'ok') {
            this.setState((state) => ({
                lanes: state.lanes.filter(l => l.id != id),
            }));
        }
    }

    onDragStart = (e) => {
        e.currentTarget.classList.add('w3-opacity-max');
        const initialPosition = Number(e.currentTarget.dataset.index);
        this.setState((state) => ({
            dragAndDrop: {
                ...state.dragAndDrop,
                draggedFrom: initialPosition,
                isDragging: true,
                originalOrder: state.lanes.map(l => l.id)
            }
        }));
        e.dataTransfer.setData("text/html", ''); // Firefox?
    }

    onDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('w3-leftbar', 'w3-rightbar');
        let newList = this.state.dragAndDrop.originalOrder;
        const draggedFrom = this.state.dragAndDrop.draggedFrom;
        const draggedTo = Number(e.currentTarget.dataset.index);
        const itemDragged = newList[draggedFrom]
        const remainingItems = newList.filter( (item, index) => index !== draggedFrom);

        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ]
        if (draggedTo !== this.state.dragAndDrop.draggedTo) {
            this.setState((state) => ({
                dragAndDrop: {
                    ...state.dragAndDrop,
                    updatedOrder: newList,
                    draggedTo: draggedTo
                }
            }));
        }
    }

    onDrop = async (e) => {
        e.currentTarget.classList.remove('w3-leftbar', 'w3-rightbar');
        const response = await fetch(`http://localhost:3333/lane/reorder`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newOrder: this.state.dragAndDrop.updatedOrder,
                boardId: this.props.boardId,
            })
        })
        const json = await response.json();
        this.setState({
            isLoaded: true,
            lanes: json,
        });
    }

    onDragLeave = (e) => {
        e.currentTarget.classList.remove('w3-leftbar', 'w3-rightbar');
        this.setState((state) => ({
            dragAndDrop: {
                ...state.dragAndDrop,
                draggedTo: null
            }
        }));
    }

    onDragEnd = (e) => {
        e.currentTarget.classList.remove('w3-opacity-max');
    }

    handleInput = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    render() {
        const { error, isLoaded, lanes } = this.state;
        const allLanes = lanes.map((lane, index) => 
            <Lane 
                key={lane.id} 
                lane={lane}
                deleteLane={this.deleteLane}
                index={index}
                onDragStart={this.onDragStart}
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                onDragLeave={this.onDragLeave}
                onDragEnd={this.onDragEnd}
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
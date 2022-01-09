import React from 'react';
import Lane from './Lane';
import { getLanes, addLane, deleteLane, reorderLanes, duplicateLane } from '../api/api';

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
        laneInModal: null,
    }

    async componentDidMount() {
        // On first load we are often missing boardId!
        if (this.props.boardId) {
            const json = await getLanes(this.props.boardId);
            this.setState({
                isLoaded: true,
                lanes: json,
            })
        }
    }

    addLane = async (e) => {
        e.preventDefault();
        const json = await addLane(this.props.boardId);
        this.setState((state) => ({
            isLoaded: true,
            lanes: [...state.lanes, json],
            inputValue: '',
        }));
    }
    
    duplicateLane = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.laneId;
        const json = await duplicateLane(id);
        this.setState((state) => ({
            isLoaded: true,
            lanes: [...state.lanes, json],
            inputValue: '',
        }));
    }

    openInModal = (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.laneId;
        this.setState({ laneInModal: parseInt(id) });
        document.getElementById('lane-modal').style.display = 'block';
    }

    closeModel = (e) => {
        this.setState({ laneInModal: null });
        document.getElementById('lane-modal').style.display = 'none';
    }

    deleteLane = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.laneId;
        const json = await deleteLane(id);
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
        const json = await reorderLanes(this.state.dragAndDrop.updatedOrder, this.props.boardId);
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
        e.currentTarget.setAttribute('draggable', 'false');
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
                duplicateLane={this.duplicateLane}
                openInModal={this.openInModal}
                index={index}
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                onDragLeave={this.onDragLeave}
                onDragEnd={this.onDragEnd}
                isBlank={this.state.laneInModal && lane.id === this.state.laneInModal}
            />
        )
        return (
            <div>
                <div className="lanes">
                    {allLanes}
                    <div className="w3-panel lane w3-border w3-topbar w3-round w3-border-deep-purple" style={{width: '24em'}}>
                        <button className="w3-btn w3-light-gray w3-block w3-margin-bottom w3-margin-top" onClick={this.addLane}>Add Lane</button>
                    </div>
                </div>
                <div id="lane-modal" className="w3-modal">
                    <div className="w3-modal-content">
                    <div className="flex-container flex-end">
                        <button 
                            type="button" 
                            className="w3-btn w3-round-xxlarge" 
                            onClick={this.closeModel}
                        >
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                        { 
                            (this.state.laneInModal ? 
                                <Lane
                                    key={this.state.laneInModal}
                                    lane={lanes.find(l => l.id === this.state.laneInModal)}
                                    inModal={true}
                                />
                            : null
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;
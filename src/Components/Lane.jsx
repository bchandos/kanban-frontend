import React from 'react';
import Card from './Card';
import EditableText from './EditableText';
import { getCards, addCard, deleteCard, reorderCards, editLaneName } from '../api/api';

class Lane extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        cards: [],
        dragAndDrop: {
            draggedFrom: null,
            draggedTo: null,
            isDragging: false,
            originalOrder: [],
            updatedOrder: []
        },
        hideComplete: false,
    }

    async componentDidMount() {
        const json = await getCards(this.props.lane.id)
        this.setState({
            isLoaded: true,
            cards: json
        })

        const laneHide = localStorage.getItem(`lane${this.props.lane.id}Hide`);
        if (laneHide) {
            this.setState({
                hideComplete: laneHide === 'true',
            })
        }
    }

    dragIndicatorDown = (e) => {
        e.currentTarget.closest('.lane').setAttribute('draggable', 'true');
    }

    dragIndicatorUp = (e) => {
        e.currentTarget.closest('.lane').setAttribute('draggable', 'false');
    }

    addCard = async (e) => {
        e.preventDefault();
        const json = await addCard(this.props.lane.id);
        this.setState({
            isLoaded: true,
            cards: json,
        })
    }

    deleteCard = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.cardId;
        const json = await deleteCard(id);
        if (json.status == 'ok') {
            this.setState((state) => ({
                cards: state.cards.filter(c => c.id != id),
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
                originalOrder: state.cards.map(c => c.id)
            }
        }));
        e.dataTransfer.setData("text/html", ''); // Firefox?
    }

    onDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('w3-border', 'w3-border-green');
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
        e.currentTarget.classList.remove('w3-border', 'w3-border-green');
        const json = await reorderCards(this.state.dragAndDrop.updatedOrder, this.props.lane.id);
        this.setState({
            isLoaded: true,
            cards: json,
        });
    }

    onDragLeave = (e) => {
        e.currentTarget.classList.remove('w3-border', 'w3-border-green');
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

    handleClick = (e) => {
        this.setState({
            hideComplete: e.currentTarget.checked,
        })
        localStorage.setItem(`lane${this.props.lane.id}Hide`, e.currentTarget.checked);
    }

    render() {
        const { error, isLoaded, cards } = this.state;
        const allCards = cards.map( (card, index) => 
            <Card 
                key={card.id}
                card={card}
                index={index}
                deleteCard={this.deleteCard}
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                onDragLeave={this.onDragLeave}
                onDragEnd={this.onDragEnd}
                hideComplete={this.state.hideComplete}
            />
        )
        return (
            <div 
                className="w3-panel lane w3-border w3-topbar w3-round w3-border-deep-purple" 
                data-index={this.props.index}
                data-lane-id={this.props.lane.id}
                data-sort-order={this.props.lane.sortOrder}
                onDragStart={this.props.onDragStart}
                onDragOver={this.props.onDragOver}
                onDrop={this.props.onDrop}
                onDragLeave={this.props.onDragLeave}
                onDragEnd={this.props.onDragEnd}
            >
                <div className="lane-header">
                    { (!this.props.inModal ? 
                    <i className="material-icons icon" onMouseDown={this.dragIndicatorDown} onMouseUp={this.dragIndicatorUp}>
                        drag_indicator
                    </i>
                    : null
                    )}
                    <EditableText 
                        value={this.props.lane.name}
                        id={this.props.lane.id}
                        apiRoute={editLaneName}
                        defaultText='New Lane'
                    />
                    { (!this.props.inModal ? 
                    <React.Fragment>
                        <button 
                            className="w3-btn w3-round-xxlarge" 
                            onClick={this.props.deleteLane}
                            data-lane-id={this.props.lane.id}
                        >
                            <i className="material-icons icon">delete</i>
                        </button>
                        <button 
                            className="w3-btn w3-round-xxlarge" 
                            onClick={this.props.duplicateLane}
                            data-lane-id={this.props.lane.id}
                        >
                            <i className="material-icons icon">content_copy</i>
                        </button>
                        <button 
                            className="w3-btn w3-round-xxlarge" 
                            onClick={this.props.openInModal}
                            data-lane-id={this.props.lane.id}
                        >
                            <i className="material-icons icon">open_in_full</i>
                        </button>
                    </React.Fragment>
                    : null
                    )}
                </div>
                <div>
                    <input className="w3-margin-left" type="checkbox" onChange={this.handleClick} checked={this.state.hideComplete} />
                    <span className="w3-padding-small">
                        Hide completed cards
                    </span>
                </div>
                <div>
                    {allCards}
                </div>
                <button className="w3-btn w3-light-gray w3-block w3-margin-bottom" onClick={this.addCard}>
                    + Add New Card
                </button>
            </div>
        );
    }
}

export default Lane;
import React from 'react';
import Card from './Card';
import EditableText from './EditableText';

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
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3333/lane/${this.props.lane.id}/cards`);
        const json = await response.json()
        this.setState({
            isLoaded: true,
            cards: json
        })
    }

    addCard = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3333/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'New Card',
                laneId: this.props.lane.id,
            })
        })
        const json = await response.json();
        this.setState({
            isLoaded: true,
            cards: json,
        })
    }

    deleteCard = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.cardId;
        const response = await fetch(`http://localhost:3333/card/${id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (json.status == 'ok') {
            this.setState({
                cards: this.state.cards.filter(c => c.id != id),
            })
        }
    }

    onDragStart = (e) => {
        e.currentTarget.classList.add('w3-opacity-max');
        const initialPosition = Number(e.currentTarget.dataset.index);
        const initialSortOrder = Number(e.currentTarget.dataset.sortOrder);
        const cardId = Number(e.currentTarget.dataset.cardId);
        this.setState({
            dragAndDrop: {
                ...this.state.dragAndDrop,
                draggedFrom: initialPosition,
                isDragging: true,
                originalOrder: this.state.cards.map(c => c.id)
            }
        });
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
            this.setState({
                dragAndDrop: {
                    ...this.state.dragAndDrop,
                    updatedOrder: newList,
                    draggedTo: draggedTo
                }
            });
        }
    }

    onDrop = async (e) => {
        e.currentTarget.classList.remove('w3-border', 'w3-border-green');
        const response = await fetch(`http://localhost:3333/card/reorder`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newOrder: this.state.dragAndDrop.updatedOrder,
                laneId: this.props.lane.id,
            })
        })
        const json = await response.json();
        this.setState({
            isLoaded: true,
            cards: json,
        });
    }

    onDragLeave = (e) => {
        e.currentTarget.classList.remove('w3-border', 'w3-border-green');
        this.setState({
            dragAndDrop: {
                ...this.state.dragAndDrop,
                draggedTo: null
            }
        });
    }

    onDragEnd = (e) => {
        e.currentTarget.classList.remove('w3-opacity-max');
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
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                onDragLeave={this.onDragLeave}
                onDragEnd={this.onDragEnd}
            />
        )
        return (
            <div className="w3-panel lane w3-border w3-topbar w3-round w3-border-deep-purple">
                <button 
                    className="w3-circle" 
                    onClick={this.props.deleteLane}
                    data-lane-id={this.props.lane.id}
                >
                    <i className="material-icons icon">delete</i>
                </button>
                <EditableText 
                    value={this.props.lane.name}
                    id={this.props.lane.id}
                    apiRoute="http://localhost:3333/lane"
                />
                <div>
                    {allCards}
                </div>
                <button className="w3-btn w3-light-gray w3-block" onClick={this.addCard}>
                    + Add New Card
                </button>
            </div>
        );
    }
}

export default Lane;
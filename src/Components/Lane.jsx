import React from 'react';
import Card from './Card';
import './Lane.css';

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

    deleteCard = async (id) => {
        // e.preventDefault();
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
        e.currentTarget.style.borderColor = 'red';
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
        this.setState({
            dragAndDrop: {
                ...this.state.dragAndDrop,
                draggedTo: null
            }
        });
        e.currentTarget.style.borderColor = 'grey';
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
            />
        )
        return (
            <div className="lane">
                <button className="delete-btn" 
                    onClick={() => this.props.deleteLane(this.props.lane.id)}
                >
                        X
                </button>
                <div className="lane-name">{this.props.lane.name}</div>
                <div className="card-holder">
                    {allCards}
                </div>
                <button className="btn" onClick={this.addCard}>
                    + Add New Card
                </button>
            </div>
        );
    }
}

export default Lane;
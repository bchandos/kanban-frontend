import React from 'react';
import Card from './Card';
import './Lane.css';

class Lane extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        cards: []
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3333/lane/${this.props.laneId}/cards`);
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
                laneId: this.props.laneId,
            })
        })
        const json = await response.json();
        this.setState({
            isLoaded: true,
            cards: [...this.state.cards, json],
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

    render() {
        const { error, isLoaded, cards } = this.state;
        const allCards = cards.map( (card) => 
            <Card 
                key={card.id}
                name={card.name}
                cardId={card.id}
                deleteCard={this.deleteCard}
            />
        )
        return (
            <div className="lane">
                <button className="delete-btn" 
                    onClick={() => this.props.deleteLane(this.props.laneId)}
                >
                        X
                </button>
                <div className="lane-name">{this.props.name}</div>
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
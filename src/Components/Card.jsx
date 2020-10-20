import React from 'react';
import './Card.css';

class Card extends React.Component {
    render() {

        return (
            <div className="card">
                <div className="card-title">
                    {this.props.name}
                </div>
                <button className="delete-btn"
                    onClick={() => this.props.deleteCard(this.props.cardId)}
                >
                        X
                </button>
            </div>
        );
    }
}

export default Card;
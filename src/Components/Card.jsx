import React from 'react';
import './Card.css';

class Card extends React.Component {
    render() {
        return (
            <div 
                className="card" 
                draggable="true" 
                data-index={this.props.index}
                data-card-id={this.props.card.id}
                data-sort-order={this.props.card.sortOrder}
                onDragStart={this.props.onDragStart}
                onDragOver={this.props.onDragOver}
                onDrop={this.props.onDrop}
                onDragLeave={this.props.onDragLeave}
            >
                <div className="card-title">
                    {this.props.card.name}
                    ({this.props.card.sortOrder})
                    ({this.props.card.id})

                </div>
                <button className="delete-btn"
                    onClick={() => this.props.deleteCard(this.props.card.id)}
                >
                        X
                </button>
            </div>
        );
    }
}

export default Card;
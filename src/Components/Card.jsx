import React from 'react';
import './Card.css';
import EditableText from './EditableText';

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
                onDragEnd={this.props.onDragEnd}
            >
                <div className="card-title">
                <EditableText 
                    value={this.props.card.name} 
                    id={this.props.card.id} 
                    apiRoute="http://localhost:3333/card/"
                />
                </div>
                <i className="material-icons icon" onClick={this.props.deleteCard} data-card-id={this.props.card.id}>
                    delete
                </i>
            </div>
        );
    }
}

export default Card;
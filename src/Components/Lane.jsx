import React from 'react';
import Card from './Card';
import './Lane.css';

class Lane extends React.Component {
    render() {
        const cards = this.props.cards.map( (card) => 
            <Card />
        )
        return (
            <div className="lane">
                Lane id, {this.props.laneId}:
                {this.props.name}.
                {cards}
            </div>
        );
    }
}

export default Lane;
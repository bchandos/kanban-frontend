import React from 'react';
import Lane from './Lane';
import './Board.css';

class Board extends React.Component {
    render() {
        const lanes = this.props.lanes.map((lane) => 
            <Lane 
                laneId={lane} 
                key={lane} 
                name="A Great Lane" 
                cards={[1,2,3,4,5,6]}
            />
        )
        return (
            <div>
                <p>
                    This is the Kanban Board id {this.props.id}.
                </p>
                <div className="board">
                    {lanes}
                </div>
            </div>
        );
    }
}

export default Board;
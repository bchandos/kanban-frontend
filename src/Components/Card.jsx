import React from 'react';
import EditableText from './EditableText';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: this.props.card.contents || '',
        }
    }

    updateContents = async (e) => {
        const response = await fetch(`http://localhost:3333/card/${this.props.card.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.props.id,
                    contents: e.currentTarget.value,
                })
            });
        const json = await response.json();
        this.setState({
            contents: json.contents,
        })
    }

    render() {
        const completionPercentage = Math.round(this.props.card.completionPercentage * 100);
        return (
            <div 
                className="w3-card w3-hover-shadow w3-round"
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
                <div 
                    className="w3-panel" 
                >
                    <div className="w3-panel">
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
                <div className="w3-panel">
                    <div>Complete: {completionPercentage}%</div>
                    <textarea 
                        className="w3-block w3-margin-top w3-margin-bottom"
                        name={"card-content-" + this.props.card.id}
                        id={"card-content-" + this.props.card.id}
                        onChange={this.updateContents}
                        value={this.state.contents}
                    >
                    </textarea>
                </div>
            </div>
        );
    }
}

export default Card;
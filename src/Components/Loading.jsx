import React from 'react';

class Loading extends React.Component {
    
    render() {
        return (
            <div className="loading-canvas w3-display-container">
                <div className="w3-card w3-display-middle w3-padding-large">
                    <h1>
                        Loading...
                    </h1>
                </div>
            </div>
        )
    }
}

export default Loading;
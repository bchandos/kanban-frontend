import React from 'react';

class Loading extends React.Component {
    
    render() {
        return (
            <div className="loading-canvas w3-display-container w3-light-gray">
                <div className="w3-display-middle w3-padding-large">
                    <h1 className="w3-animate-fading">
                        Loading...
                    </h1>
                </div>
            </div>
        )
    }
}

export default Loading;
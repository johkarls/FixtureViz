
import React from 'react'; 

export default class FixtureEntity extends React.Component{ 
    
    constructor() {
        super(); 
    }
 

  componentDidMount () {
  }
  
  
  componentWillUnmount () {

  }
  
  render () {

    var hiderStyle = {
      bottom : (this.props.value  * 100.0) + '%'
    };
    
    return (
      <div className="fixture-entity">
        <div className="hider" style={hiderStyle}></div>
      </div>
    );
  }
  
}

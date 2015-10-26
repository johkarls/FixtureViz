
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

     var fixtureStyle = {
        backgroundColor : 'hsl(' + this.props.value * 100 + ', 100%, 50%)'
    };
    
    var hiderStyle = {
      bottom : (this.props.value  * 100.0) + '%'
    };
    
    return (
      <div className="fixture-entity" style={fixtureStyle}>
        <div className="hider" style={hiderStyle}></div>
      </div>
    );
  }
  
}


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
    return (
      <div className="fixture_entity">{this.props.value}</div>
    );
  }
  
}


import FixtureEntity from './FixtureEntity';
import Helpers from './Helpers';
import React from 'react'; 
import _ from 'underscore';



class FixtureRow extends React.Component { 
  
  
    constructor() {
      super(); 
    }


  componentDidMount () {
  }
  
  renderFixtureEntities(){
     return  _.map(this.props.fixtures, (f) => {
          return <FixtureEntity value={f.data.value}
                                 opposition={f.data.opposition}
                                 key={f.fixture.id + "" + f.data.value }/>
                
      });
  }
  
  render () {
      
    
    
    var FixtureTeamName = (props) => {
        return (
            <div className="fixture-team">
                <p className="name">{this.props.teamName}</p>
                <p className="info">{this.props.shortInfo}</p>
            </div>
            )
};

     return (
        <div className="fixture-row">
            <FixtureTeamName name={this.props.teamName}/>
            <div className="fixture-entities">
                {this.renderFixtureEntities()}
            </div>
            
       </div>
    );
  }
  
}

FixtureRow.propTypes = { 
    teamName: React.PropTypes.string.isRequired
};

export default FixtureRow;
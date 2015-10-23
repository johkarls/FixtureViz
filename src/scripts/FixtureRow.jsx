
import FixtureEntity from './FixtureEntity';
import React from 'react'; 
import _ from 'underscore';


export default class FixtureRow extends React.Component { 
  
  
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
            <div className="fixture_team_name_wrapper">
                <p className="fixture_team_name">{this.props.teamName}</p>
                <p className="fixture_team_info">{this.props.shortInfo}</p>
            </div>
            )
};

     return  (
        <div>
            <FixtureTeamName name={this.props.teamName}/>
            {this.renderFixtureEntities()}
        </div>
  
    );
  }
  
}

FixtureRow.propTypes = { 
    teamName: React.PropTypes.string.isRequired
};

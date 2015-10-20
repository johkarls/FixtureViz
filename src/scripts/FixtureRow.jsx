
import FixtureEntity from './FixtureEntity';
import React from 'react'; 


export default class FixtureRow extends React.Component { 
  
  
    constructor() {
      super(); 
    }
 
  
  componentDidMount () {
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
            <br></br>
        </div>
  
    );
  }
  
}

FixtureRow.propTypes = { 
    value: React.PropTypes.number.isRequired,
    teamName: React.PropTypes.string.isRequired
};

FixtureRow.defaultProps = { 
    value: 0,
    teamName: "Manchester United"
};
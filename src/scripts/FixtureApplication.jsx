import APIManager from './APIManager';
import FixtureRow from './FixtureRow';
import Helpers from './Helpers';
import React from 'react'; 
import _ from 'underscore';


export default class FixtureApplication extends React.Component { 
  
  constructor() {
    super(); 
    
    this.apiManager = new APIManager();
    this.helpers = new Helpers(); 

    
    this.updateTable = this.updateTable.bind(this);
    
    this.state = {
        teams :[]
        
    }
  }
  

  
  onDataLoaded(data) {
      var tableData = JSON.parse(data[0]);
      var fixturesData = JSON.parse(data[1]); 
  }
 updateTable(tableObj) {
   
    var teamsArr =  _.map(tableObj.standing, function(tableEntry) {
     return {
         teamName: tableEntry.teamName,
         points: tableEntry.points, 
         goalDifference : tableEntry.goalDifference,
         goals: tableEntry.goals,
         goalsAgainst: tableEntry.goalsAgainst, 
         playedGames : tableEntry.playedGames,
         position: tableEntry.position,
         link:tableEntry._links.team.href
     }
 });
   
   this.setState({teams: teamsArr});
   
 }
  
  componentDidMount () {
   /* this.apiManager.getTable(this.helpers.getLeagueIds("PremierLeague"), this.updateTable); 
     this.apiManager.getFixtures(this.helpers.getLeagueIds("PremierLeague"), this.updateFixtures); */
     
     this.apiManager.getAllData(this.helpers.getLeagueIds("PremierLeague"), this.onDataLoaded);
   
  }
  
  componentWillUnmount () {

  }
  
  renderTable() {
     return _.map(this.state.teams, function(t) {
         var shortInfo = `Placed ${t.position} with  ${t.points}  points`; 
        return  <FixtureRow teamName={t.teamName}
                            shortInfo={shortInfo}
                            key={t.teamName}/>
     });
  }
  
  
  render () {
       return (
         <div className="table">
            {this.renderTable()}
         </div>
          
        );
  }
  
}
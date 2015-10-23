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


        this.onDataLoaded = this.onDataLoaded.bind(this);

        this.state = {
            teams: []
        };
    }


    updateTable(tableObj, fixturesObj) {

        var teamsArr = _.map(tableObj.standing, (tableEntry) => {
            return {
                teamName: tableEntry.teamName,
                points: tableEntry.points,
                goalDifference: tableEntry.goalDifference,
                goals: tableEntry.goals,
                goalsAgainst: tableEntry.goalsAgainst,
                playedGames: tableEntry.playedGames,
                position: tableEntry.position,
                link: tableEntry._links.team.href,
                fixtures: []
            };
        });

        var totalTeamCount = teamsArr.length; 
        
        _.each(fixturesObj.fixtures, (f) => {


            var fixtureHomeTeam = _.find(teamsArr, (t)=>{
               return t.teamName === f.homeTeamName;     
            });
            
             var fixtureAwayTeam = _.find(teamsArr, (t)=>{
               return t.teamName === f.awayTeamName;     
            });
            
          
            var fixture = {
                id: f._links.self.href,
                date: new Date(f.date),
                gameweek: f.matchday,
                status: f.status,
                result: {
                    homeGoals: f.homeTeamGoals,
                    awayGoals: f.awayTeamGols
                }, 
            };
            
            
            var homeDiff = totalTeamCount - fixtureHomeTeam.position;
            var awayDiff = totalTeamCount - fixtureAwayTeam.position; 
          
            var homeValue = (homeDiff/(homeDiff+awayDiff)).toPrecision(3);
            var awayValue = (awayDiff/(homeDiff+awayDiff)).toPrecision(3);
                                                                                        
                                                                                        
            fixtureHomeTeam.fixtures.push(
                {fixture: fixture,
                 data: {
                    opposition: fixtureAwayTeam.teamName,
                    value: homeValue}    
                });
            fixtureAwayTeam.fixtures.push({
                fixture: fixture, 
                data: {
                    opposition: fixtureHomeTeam.teamName,
                    value: awayValue
                }
            });
            
 
            
        });

        
        this.setState({
            teams: teamsArr
        });

    }

    onDataLoaded(data) {
        var tableData = JSON.parse(data[0]);
        var fixturesData = JSON.parse(data[1]);

        this.updateTable(tableData, fixturesData);
    }



    componentDidMount() {
        /* this.apiManager.getTable(this.helpers.getLeagueIds("PremierLeague"), this.updateTable); 
          this.apiManager.getFixtures(this.helpers.getLeagueIds("PremierLeague"), this.updateFixtures); */

        this.apiManager.getAllData(this.helpers.getLeagueIds("PremierLeague"), this.onDataLoaded);

    }

    componentWillUnmount() {

    }

    renderTable() {
        return _.map(this.state.teams, (t) => {
            var shortInfo = `Placed ${t.position} with  ${t.points}  points`;
            return <FixtureRow teamName={t.teamName}
                            shortInfo={shortInfo}
                            fixtures={t.fixtures}
                            key={t.teamName}/>;
        });
    }


    render() {
      return (
        <div className="fixture-application">
            <div className="header"></div>
            <div className="table">
                 {this.renderTable()}
            </div>
        </div>
        );
    }

}
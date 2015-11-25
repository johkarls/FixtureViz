import APIManager from './APIManager';
import FixtureRow from './FixtureRow';
import Helpers from './Helpers';
import update from 'react-addons-update';
import React from 'react';
import {
    DragDropContext
}
from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'underscore';

@DragDropContext(HTML5Backend)
export default class FixtureApplication extends React.Component {

    constructor() {
        super();

        this.apiManager = new APIManager();
        this.helpers = new Helpers();


        this.onDataLoaded = this.onDataLoaded.bind(this);
        this.moveRow = this.moveRow.bind(this);
      


        this.state = {
            teams: []
        };
    }



    findTeam(teamName) {
        var team = _.find(this.state.teams, (t) => {
            return t.teamName === teamName;
        });

        return team;
    }


    getFixtureOutcome(isHomeTeam, homeGoals, awayGoals, fixtureStatus) {

        var outcome;

        if (fixtureStatus !== 'FINISHED')
            outcome = "UNKNOWN";
        else {

            const WON = "WON";
            const LOST = "LOST";
            const DRAW = "DRAW";


            if (homeGoals > awayGoals)
                outcome = isHomeTeam ? WON : LOST;
            else if (homeGoals < awayGoals)
                outcome = isHomeTeam ? LOST : WON;
            else
                outcome = DRAW;

        }

        return outcome;

    }
    createTeams(table, fixtures) {

        var teamsArr = _.map(table, (tableEntry) => {
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

        var totalTeamCount = teamsArr.length + 1;

        _.each(fixtures, (f) => {

            var fixtureHomeTeam = _.find(teamsArr, (t) => {
                return t.teamName === f.homeTeamName;
            });

            var fixtureAwayTeam = _.find(teamsArr, (t) => {
                return t.teamName === f.awayTeamName;
            });


            var fixtureCommon = {
                id: f._links.self.href,
                date: new Date(f.date),
                gameweek: f.matchday,
            }
            var homeTeamData = {
                oppositionTeam: fixtureAwayTeam,
                homeOrAway: 'Home',
                outcome: this.getFixtureOutcome(true, f.result.goalsHomeTeam, f.result.goalsAwayTeam, f.status),
                homeGoals: f.result.goalsHomeTeam,
                awayGoals: f.result.goalsAwayTeam
            };

            var awayTeamData = {
                oppositionTeam: fixtureHomeTeam,
                homeOrAway: 'Away',
                outcome: this.getFixtureOutcome(false, f.result.goalsHomeTeam, f.result.goalsAwayTeam, f.status),
                homeGoals: f.result.goalsHomeTeam,
                awayGoals: f.result.goalsAwayTeam
            };

            const homeFixture = {...fixtureCommon, ...homeTeamData
            };
            const awayFixture = {...fixtureCommon, ...awayTeamData
            };

            fixtureHomeTeam.fixtures.push(homeFixture);
            fixtureAwayTeam.fixtures.push(awayFixture);

        });

        return teamsArr;
    }

    onDataLoaded(data) {
        var tableData = JSON.parse(data[0]);
        var fixturesData = JSON.parse(data[1]);

        var teams = this.createTeams(tableData.standing, fixturesData.fixtures);


        this.setState({
            teams: teams
        });
    }


    moveRow(dragIndex, hoverIndex) {
        var dragTeam = this.state.teams[dragIndex];
        
        dragTeam.position = hoverIndex; 

        this.setState(update(this.state, {
            teams: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragTeam]
                ]
            }
        }));

    }



    componentDidMount() {
        /* this.apiManager.getTable(this.helpers.getLeagueIds("PremierLeague"), this.updateTable); 
          this.apiManager.getFixtures(this.helpers.getLeagueIds("PremierLeague"), this.updateFixtures); */

        this.apiManager.getAllData(this.helpers.getLeagueIds("PremierLeague"), this.onDataLoaded);

    }

    componentWillUnmount() {

    }

    renderGameweeks() {
        var gameWeeks = [];



        var playedGames = this.state.teams[0].playedGames;

        for (var i = 0; i < (this.state.teams.length - 1) * 2; i++) {

            var bgStyle = {
                backgroundColor: i < playedGames ? "#AAA" : (i === playedGames ? "#14AFE3" : "#333")
            };

        gameWeeks.push(<div className="gameweek" style={bgStyle} key={i}>{i+1}</div>)
    }

    return gameWeeks;
}


renderTable() {
    return _.map(this.state.teams, (t, i) => {
        var shortInfo = `Placed ${t.position} with  ${t.points}  points`;
        return <FixtureRow team={t}
                               shortInfo={shortInfo}
                               fixtures={t.fixtures}
                               index={i}
                               moveRow={this.moveRow}
                               mouseEnter={this.mouseEnter}
                               key={t.teamName}/>;
    });
}


render() {

    if (this.state.teams.length === 0) {
        return null;
    }

    return (
        <div className="fixture-application">
            <div className="header">
                <div className="settings"></div>
                <div className="gameweeks">
                    {this.renderGameweeks()}
                </div>
            </div>
            <div className="table">
                 {this.renderTable()}
            </div>
        </div>
    );
}

}

import React from 'react';

export default class FixtureEntity extends React.Component {

    constructor() {
        super();

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);

        this.state = {
            showHoverInfo: false
        };
    }


    componentDidMount() {}


    componentWillUnmount() {

    }


    getColorBasedOnOutcome(outcome) {
        let color;

        switch (outcome) {
            case 'UNKNOWN':
                color = 'hsl(' + this.props.value * 100 + ', 100%, 50%)';
                break;
            case 'WON':
                color = 'hsl(115, 100%, 30%)';
                break;
            case 'LOST':
                color = 'hsl(360, 100%, 30%)';
                break;
            case 'DRAW':
                color = 'hsl(60, 100%, 30%)';
                break;
            default:
                color = 'hsl(0, 0, 0)';
        }

        return color;
    }

    mouseEnter() {

        this.setState({
            showHoverInfo: true
        });

    }

    mouseLeave() {

        this.setState({
            showHoverInfo: false
        });

    }

    renderHoverInformation() {
        if (this.state.showHoverInfo) {
            var fixture = this.props.fixture;
            var team = this.props.team;
            var homeOrAway = fixture.homeOrAway;
            var opposition = fixture.oppositionTeam;
            var date = fixture.date;

            var homeTeamName;
            var awayTeamName;
            var homeTeamPercentage;
            var awayTeamPercentage;
            var homeTeamGoals;
            var awayTeamGoals;

            if (homeOrAway === "Home") {
                homeTeamName = team.teamName;
                awayTeamName = opposition.teamName;
                homeTeamPercentage = this.props.value;
                awayTeamPercentage = 1.0 - this.props.value;
                homeTeamGoals = fixture.homeGoals;
                awayTeamGoals = fixture.awayGoals;
            }
            else {
                homeTeamName = opposition.teamName;
                awayTeamName = team.teamName;
                awayTeamPercentage = this.props.value;
                homeTeamPercentage = 1.0 - this.props.value;
                homeTeamGoals = fixture.homeGoals;
                awayTeamGoals = fixture.awayGoals;
            }

            var fixtureEntity = this.refs.hoverInfoPanel;

            
            
            return (
                <div className="hoverInfo">
                  <div className="teamText">
                    <div className="teamName">{homeTeamName}</div>
                    <div className="numbers"><p>Prediction:</p><p>{(homeTeamPercentage * 100).toPrecision(3) + '%'}</p></div>
                    <div className="numbers"><p>Goals:</p><p>{homeTeamGoals !== -1 ? homeTeamGoals : 'Not yet played'}</p></div>
                  </div>
               
                   <div className="teamText">
                   <div className="teamName"> {awayTeamName}</div>
                   <div className="numbers"><p>Prediction:</p><p>{(awayTeamPercentage * 100).toPrecision(3) + '%'}</p></div>
                   <div className="numbers"><p>Goals:</p><p>{awayTeamGoals !== -1 ? awayTeamGoals : 'Not yet played'}</p></div>
                  </div>
                </div>

            )
        }

        return null;

    }
    render() {

        var fixtureStyle = {
            backgroundColor: this.getColorBasedOnOutcome(this.props.fixture.outcome)
        };

        var hiderStyle = {
            bottom: (this.props.value * 100.0) + '%',
            backgroundColor: this.props.fixture.outcome === 'UNKNOWN' ? '#fff' : 'transparent',
            borderBottomColor: this.props.fixture.outcome === 'UNKNOWN' ? '#888' : '#222'
        };

        return (
     <div className="fixture-entity" ref="hoverInfoPanel" style={fixtureStyle} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div className="hider" style={hiderStyle}></div>
        {this.renderHoverInformation()}
      </div>
        );
    }

}

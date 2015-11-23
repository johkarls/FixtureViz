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
            var homeTeamGoalsOrPercentage;
            var awayTeamGoalsOrPercentage;

            if (homeOrAway === "Home") {
                homeTeamName = team.teamName;
                awayTeamName = opposition.teamName;
            }
            else {
                homeTeamName = opposition.teamName;
                awayTeamName = team.teamName;
            }

            var fixtureEntity = this.refs.hoverInfoPanel;

            var fixtureEntityStyle = {
                right: 20,
                top: 20,
                position: 'fixed',
                backgroundColor: '#666',
                opacity: 0.85,
                border: '1px solid #222',
                width: '300px',
                height: '200px',
                zIndex: 10,
                pointerEvents: 'none'
            }
            return (
                <svg style={fixtureEntityStyle}  width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                  <text class="teamText" x="10" y="30">
                    {homeTeamName}
                  </text>
               
                   <text class="teamText" x="10" y="170">
                    {awayTeamName}
                  </text>
                </svg>

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

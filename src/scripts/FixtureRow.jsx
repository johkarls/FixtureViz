import FixtureEntity from './FixtureEntity';
import Helpers from './Helpers';
import {
    DragSource, DropTarget
}
from 'react-dnd';
import ReactDOM from 'react-dom';
import React from 'react';
import _ from 'underscore';

const rowSource = {
    beginDrag(props) {
        return {
            id: props.teamName,
            index: props.index
        };
    }
};

const rowTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

@
DropTarget(Helpers.ItemTypes.FIXTURE_ROW, rowTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))@ DragSource(Helpers.ItemTypes.FIXTURE_ROW, rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class FixtureRow extends React.Component {


    constructor() {
        super();
    }


    componentDidMount() {}


    calculateFixtureEstimatation(totalTeamCount, teamPos, oppositionTeamPos) {


        var teamDiff = totalTeamCount - teamPos;
        var oppositionTeamDiff = totalTeamCount - oppositionTeamPos;

        var teamValue = (teamDiff / (teamDiff + oppositionTeamDiff)).toPrecision(3);

        return teamValue;
    }

    renderFixtureEntities() {

        var teamCount = (0.5 * this.props.fixtures.length) + 1;
        var team = this.props.team;

        return _.map(this.props.fixtures, (f) => {

           var teamValue = this.calculateFixtureEstimatation(teamCount + 1, team.position, f.oppositionTeam.position);

            return <FixtureEntity value={teamValue}
                                  team={team}
                                 fixture={f}
                                 key={f.id + "" + teamValue }/>

        });
    }

    render() {

        const {
            index, team, shortInfo, isDragging, connectDragSource, connectDropTarget
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        var rowStyle = {
            opacity: opacity
        }

        var FixtureTeamName = (props) => {
            return (
                <div className="fixture-team">
                <p className="name">{team.teamName}</p>
            </div>
            )
        };

        return connectDragSource(connectDropTarget(
            <div className="fixture-row" style={rowStyle}>
            <FixtureTeamName team={team}/>
            <div className="fixture-entities">
                {this.renderFixtureEntities()}
            </div>
            
       </div>
        ));
    }

}

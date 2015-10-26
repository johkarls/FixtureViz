
import FixtureEntity from './FixtureEntity';
import Helpers from './Helpers';
import { DragSource, DropTarget } from 'react-dnd';
import React from 'react'; 
import _ from 'underscore';


const rowSource = {
  beginDrag(props) {
    return {};
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

    // Determine rectangle on screen
    const hoverBoundingRect = React.findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
   // props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


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
      
    const {isDragging, connectDragSource, connectDropTarget  } = this.props;
    
    
    var FixtureTeamName = (props) => {
        return (
            <div className="fixture-team">
                <p className="name">{this.props.teamName}</p>
                <p className="info">{this.props.shortInfo}</p>
            </div>
            )
};

     return  connectDragSource(connectDropTarget(
        <div className="fixture-row">
            <FixtureTeamName name={this.props.teamName}/>
            <div className="fixture-entities">
                {this.renderFixtureEntities()}
            </div>
            
       </div>
    ));
  }
  
}

FixtureRow.propTypes = { 
    teamName: React.PropTypes.string.isRequired
};

export default DragSource(Helpers.ItemTypes.FIXTURE_ROW, rowSource, collect)(FixtureRow);
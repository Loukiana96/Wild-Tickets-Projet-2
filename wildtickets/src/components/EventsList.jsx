import React, { Component, Fragment } from 'react';
import axios from "axios";
import Bands from './Bands'
import { Container, Row } from 'reactstrap';


class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventArray: [],
      alert: false,
      message: undefined
    }
    this.handleAlert = this.handleAlert.bind(this)
  }

  handleAlert(msg) {
    this.setState({
      alert: true,
      message: msg
    });

    setTimeout(() => {
      this.setState({
        alert: false,
        message: undefined
      });
    }, 3000);
  }

  componentDidMount() {
    axios.get("https://api.songkick.com/api/3.0/metro_areas/28886/calendar.json?apikey=5yrQwIh2tGWNTggG").then(res => {
        const mySortedEvents = res.data.resultsPage.results.event.sort((evtA, evtB)=>{
            if(evtA.popularity > evtB.popularity) {
                return -1;
            } else {
                return 1;
            }
        });

        this.setState({
            eventArray: mySortedEvents,
        });
    });
}

  render() {

    return (
      <Fragment>
        {
          this.state.alert &&
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        }
          <Container>
            <Row className='scrolling-wrapper-flexbox grid'>
              {this.state.eventArray.map((eachEvent, i) => {
                return (eachEvent.performance[0]
                  &&
                  <Bands
                    key={i}
                    name={eachEvent.performance[0].displayName}
                    avatar={eachEvent.performance[0].artist.id}
                    venue={eachEvent.venue.displayName}
                    date={eachEvent.start.date}
                    link={eachEvent.performance[0].artist.id}
                    fav={eachEvent.id}
                    alertFunction={this.handleAlert}
                  />
                )
              })}
            </Row>
          </Container>
      </Fragment>
    );
  }
}

export default EventsList;
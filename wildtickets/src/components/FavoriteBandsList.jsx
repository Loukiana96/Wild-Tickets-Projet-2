import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import EventsList from './EventsList';

class FavoriteBandsList extends React.Component {

    render() {
        return (
            <Fragment>
                <Container>
                    <h1>Favorite Bands</h1>
                    <EventsList />
                </Container>
            </Fragment>
        )
    }

};

export default FavoriteBandsList;
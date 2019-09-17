import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import RouteCard from '../RouteCard/RouteCard';
import AddRouteButton from '../AddRouteButton/AddRouteButton';
import './RouteCardTable.css';

const RouteCardTable = ({
  user, routes, ascents, sectorId, addRoute, onRouteClick,
}) => (
  <div className="content-m__inner-card">
    {
      (sectorId !== 0 && user) && <AddRouteButton onClick={addRoute} />
    }
    {R.map(route => (
      <RouteCard
        key={route.id}
        route={route}
        ascent={R.find(ascent => ascent.route_id === route.id, ascents)}
        onRouteClick={() => onRouteClick(route.id)}
      />
    ), routes)}
  </div>
);


RouteCardTable.propTypes = {
  user: PropTypes.object,
  routes: PropTypes.array.isRequired,
  ascents: PropTypes.array.isRequired,
  addRoute: PropTypes.func.isRequired,
  sectorId: PropTypes.number.isRequired,
  onRouteClick: PropTypes.func.isRequired,
};

export default RouteCardTable;
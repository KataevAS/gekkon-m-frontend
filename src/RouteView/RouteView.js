import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Marker from '../Marker/Marker';
import MARKER_RADIUS from '../Constants/Marker';
import './RouteView.css';

export default class RouteView extends Component {
  onContextMenu = (event) => {
    event.preventDefault();
  };

  render() {
    const {
      route, routePhoto, pointers, onClick, onImageLoad, routeImageLoading,
    } = this.props;
    const mapIndexed = R.addIndex(R.map);
    return (
      <div className="route-m__route-image-wrapper">
        <div className="route-editor">
          <div
            role="button"
            tabIndex="0"
            style={{ outline: 'none' }}
            className="route-editor__img-container"
            onContextMenu={this.onContextMenu}
            onClick={onClick}
          >
            <img
              className="route-editor__img"
              src={routePhoto}
              alt={route.name}
              onLoad={onImageLoad}
              style={{ visibility: routeImageLoading ? 'hidden' : 'visible' }}
            />
            {
              !routeImageLoading
                ? (
                  <>
                    {
                      mapIndexed((pointer, index) => (
                        <Marker
                          key={index}
                          editable={false}
                          angle={pointer.angle}
                          radius={MARKER_RADIUS}
                          dx={pointer.dx}
                          dy={pointer.dy}
                          left={pointer.x}
                          top={pointer.y}
                        />
                      ), pointers)
                    }
                  </>
                )
                : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

RouteView.propTypes = {
  routeImageLoading: PropTypes.bool,
  onClick: PropTypes.func,
  routePhoto: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
  pointers: PropTypes.array.isRequired,
  onImageLoad: PropTypes.func.isRequired,
};

RouteView.defaultProps = {
  onClick: null,
  routeImageLoading: false,
};
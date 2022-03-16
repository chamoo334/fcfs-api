import React, { Fragment, useEffect, useState } from 'react';
import { geoCentroid } from 'd3-geo';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from 'react-simple-maps';
import allStates from './data/allstates';
import { useDispatch, useSelector } from 'react-redux';
import { getStateParks, getParkCamps } from '../../actions/campgrounds';
import { Link } from 'react-router-dom';
const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const MapChart = () => {
  const dispatch = useDispatch();
  const [parksData, setParksData] = useState([]);
  const [showParks, setShowParks] = useState(false);
  const [clickedState, setClickedState] = useState('');

  const setPark = (pName, pSlug) => async e => {
    // await dispatch(getStateParks(identifier));
    await dispatch(getParkCamps(pSlug));

    console.log(pName);
  };

  const Results = () => {
    return (
      <div className='state-park bg-light'>
        <h2>{clickedState}</h2>
        <ul>
          {parksData.map(park => (
            <h3>
              <Link
                to={`/park/${park.slug}`}
                state={{ parkName: park.name }}
                className='btn'
                onClick={setPark(park.name, park.slug)}>
                {' '}
                {park.name}
              </Link>
            </h3>
          ))}
        </ul>
      </div>
    );
  };

  const parks = useSelector(state => state.campgrounds.stateData);
  useEffect(() => {
    setParksData(parks);
  }, [parks]);

  const stateNameClick = (geoName, geoID) => async e => {
    const cur = allStates.find(s => s.val === geoID);
    const identifier = cur.id.toLowerCase();
    await dispatch(getStateParks(identifier));
    setClickedState(geoName);
    setShowParks(true);
  };

  return (
    <Fragment>
      <ComposableMap projection='geoAlbersUsa'>
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke='#FFF'
                  geography={geo}
                  fill={
                    clickedState === geo.properties.name ? '#0093f5' : '#DDD'
                  }
                  onClick={stateNameClick(geo.properties.name, geo.id)}
                />
              ))}
              {geographies.map(geo => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find(s => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + '-name'}>
                    {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text y='2' fontSize={14} textAnchor='middle'>
                            {cur.id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}>
                          <text x={4} fontSize={14} alignmentBaseline='middle'>
                            {cur.id}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
      {showParks ? <Results /> : null}
    </Fragment>
  );
};

export default MapChart;

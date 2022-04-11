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
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [parksData, setParksData] = useState([]);
  const [showParks, setShowParks] = useState(false);
  const [clickedState, setClickedState] = useState('');
  const [clickedID, setClickedID] = useState('');

  const handleSubmit = (pName, pSlug) => e => {
    e.preventDefault();
    dispatch(getParkCamps(clickedID, pName, pSlug, navigate));
  };

  const parks = useSelector(state => state.campgrounds.stateData);
  const stateID = useSelector(state => state.campgrounds.stateName);
  useEffect(() => {
    setParksData(parks);

    if (parks.length > 0) {
      const identifier = stateID.toUpperCase();
      const cur = allStates.find(s => s.id === identifier);
      setClickedState(cur.fullName);
      setClickedID(stateID);
      setShowParks(true);
    }
  }, [parks, stateID]);

  const stateNameClick = (geoName, geoID) => async e => {
    const cur = allStates.find(s => s.val === geoID);
    const identifier = cur.id.toLowerCase();
    await dispatch(getStateParks(identifier));
    setClickedState(geoName);
    setClickedID(identifier);
    setShowParks(true);
  };

  const Results = () => {
    return (
      <div role='parks-list' className='state-park bg-light'>
        <h2>{clickedState}</h2>
        <ul>
          {parksData.map(park => (
            <form
              key={park.slug}
              className='form'
              onSubmit={handleSubmit(park.name, park.slug)}>
              <input
                type='submit'
                value={park.name}
                className='btn'
                style={{ fontSize: '18px' }}
              />
            </form>
          ))}
        </ul>
      </div>
    );
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
                          <text
                            y='2'
                            fontSize={14}
                            textAnchor='middle'
                            onClick={stateNameClick(
                              geo.properties.name,
                              geo.id
                            )}>
                            {cur.id}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}>
                          <text
                            x={4}
                            fontSize={14}
                            alignmentBaseline='middle'
                            onClick={stateNameClick(
                              geo.properties.name,
                              geo.id
                            )}>
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

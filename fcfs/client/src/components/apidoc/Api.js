import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_API_VERSION } from '../../actions/constants';

const Api = () => {
  const [displayData, setDisplayData] = useState('cur');
  const [curData, setCurData] = useState('');
  const [otherData, setOtherData] = useState('');
  const [useHeader, SetUseHeader] = useState(true);

  const setFileName = versionNum => {
    return `V${versionNum}.md`;
  };

  const Header = () => {
    return (
      <div>
        <h1>First Come First Serve API</h1>
        <p>Endpoints associated with FCFS API</p>
      </div>
    );
  };

  const curVer = useSelector(state => state.api.cur_api_vers);
  useEffect(() => {
    const cur_ver_file = setFileName(curVer);

    import(`./${cur_ver_file}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => {
            let lines = res.split('\n');
            lines.splice(0, 3);
            const newRes = lines.join('\n');
            setCurData(newRes);
          });
      })
      .catch(err => console.log(err));
  }, [curVer]);

  return (
    <section className='container'>
      {useHeader ? <Header /> : null}
      {displayData === 'cur' ? (
        <Markdown>{curData}</Markdown>
      ) : (
        <Markdown>{otherData}</Markdown>
      )}
    </section>
  );
};

export default Api;

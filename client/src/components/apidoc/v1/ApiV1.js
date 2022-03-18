import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { render } from 'react-dom';

const Apiv1 = () => {
  const v1 = 'V1.md';
  const [post, setPost] = useState('');

  useEffect(() => {
    import(`./${v1}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => {
            setPost(res);
          });
      })
      .catch(err => console.log(err));
  });

  return <Markdown>{post}</Markdown>;
};

export default Apiv1;

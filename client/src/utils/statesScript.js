import React from 'react';

export const statesScript = () => {
  return React.createElement(
    'script',
    null,
    'if (window.addEventListener) ',
    window.addEventListener(
      'message',
      function (event) {
        if (event.data.length >= 22) {
          if (event.data.substr(0, 22) === '__MM-LOCATION.REDIRECT')
            window.location = event.data.substr(22);
        }
      },
      false
    ),
    ' else if (window.attachEvent) ',
    window.attachEvent(
      'message',
      function (event) {
        if (event.data.length >= 22) {
          if (event.data.substr(0, 22) === '__MM-LOCATION.REDIRECT')
            window.location = event.data.substr(22);
        }
      },
      false
    )
  );
};

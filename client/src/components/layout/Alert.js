import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

// const Alert = ({ alerts }) => (
//   // const alerts = useSelector((state) => state.alerts);

//   <div className='alert-wrapper'>
//     {alerts.map(alert => (
//       <div key={alert.id} className={`alert alert-${alert.alertType}`}>
//         {alert.msg}
//       </div>
//     ))}
//   </div>
// );

// Alert.propTypes = {
//   alerts: PropTypes.array.isRequired,
// };

// const mapStateToProps = state => ({
//   alerts: state.alert,
// });

// export default connect(mapStateToProps)(Alert);

export default function Alert() {
  const alerts = useSelector(state => state.alert);

  const alertMessage = alerts !== null && alerts.length > 0 && (
    <div className='alert-wrapper'>
      {alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </div>
  );

  return alertMessage;
}

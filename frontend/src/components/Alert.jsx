import PropTypes from "prop-types";

const Alert = ({ message, type }) => {
  const alertStyle = (type) => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "info":
      default:
        return "alert-info";
    }
  };

  return <div className={`alert ${alertStyle(type)}`}>{message}</div>;
};

export default Alert;

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

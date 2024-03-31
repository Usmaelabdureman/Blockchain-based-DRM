import PropTypes from "prop-types";
const UserCard = ({
  icon,
  userType,
  selectedUserType,
  setUserType,
  description,
}) => {
  const isSelected = selectedUserType === userType;

  const handleCardClick = () => {
    if (!isSelected) {
      setUserType(userType);
    }
  };

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:border checked:border border-spacing-2 ${isSelected ? "border-green-500" : ""}`}
      onClick={handleCardClick}
    >
      <div className="px-6 py-4 flex flex-col items-center">
        <div className="w-full flex justify-between items-start">
          <div className="font-bold text-xl mb-2">{icon}</div>
          <label className="text-green-500">
            <input
              type="radio"
              value={userType}
              checked={isSelected}
              onChange={() => {
                setUserType(userType);
              }}
              className={`h-5 w-5 form-radio  ${isSelected ? "text-green-500" : ""}`}
            />
          </label>
        </div>
        <p className="text-gray-700 text-base mt-4">{description}</p>
      </div>
    </div>
  );
};

export default UserCard;

UserCard.propTypes = {
  icon: PropTypes.element.isRequired,
  userType: PropTypes.string.isRequired,
  selectedUserType: PropTypes.string.isRequired,
  setUserType: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

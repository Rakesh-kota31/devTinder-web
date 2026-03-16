const ConnectionCard = (props) => {
  const { _id, firstName, lastName, age, gender, profileURL } = props.data;

  return (
    <div className="connection-card">
      <div className="connection-card-image-container">
        <img className="connection-card-image" src={profileURL} />
      </div>
      <div className="connection-card-info">
        <div className="text-sm font-semibold opacity-60">
          {firstName + " " + lastName}
        </div>
        <div className="capitalize text-sm font-semibold opacity-60">{gender}</div>
        <div className="text-sm font-semibold opacity-60">{age}</div>
      </div>
    </div>
  );
};

export default ConnectionCard;

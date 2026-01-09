const ConnectionCard = (props) => {
  const { _id, firstName, lastName, age, gender, profileURL } = props.data;

  return (
    <div className="list-row gap-4">
      <div className="request-card-image-container">
        <img className=" request-card-image" src={profileURL} />
      </div>
      <div className="flex-1">
        <div className="text-lg font-semibold opacity-60">
          {firstName + " " + lastName}
        </div>
        <div className="capitalize">{gender}</div>
        <div className="">{age}</div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="message-button"
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default ConnectionCard;

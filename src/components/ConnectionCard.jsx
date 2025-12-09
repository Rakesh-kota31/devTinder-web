const ConnectionCard = (props) => {
  const { _id, firstName, lastName, age, gender, profileURL } = props.data;

  return (
    <li className="list-row gap-4">
      <div>
        <img className="size-10 rounded-box" src={profileURL} />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase font-semibold opacity-60">
          {firstName + " " + lastName}
        </div>
        <div>{gender}</div>
        <div>{age}</div>
      </div>
    </li>
  );
};

export default ConnectionCard;

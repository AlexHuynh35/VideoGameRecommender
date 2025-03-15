import React from "react";

type ListProp = {
  listType: string;
  list: string[];
}

const BulletList: React.FC<ListProp> = ({ listType, list }) => {
  if (!list || list.length === 0) {
    return (
      <div>
        <p>{listType}</p>
        <p>No {listType} available!</p>
      </div>
    );
  }
    
  return (
    <div>
      <p>{listType}</p>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletList
import React from 'react'

type Props = {
  title: string;
};

// TODOIS add navigation to header
//

export const Header: React.FC<Props> = (props) => {
  return (
    <h2>{props.title}</h2>
  );
}

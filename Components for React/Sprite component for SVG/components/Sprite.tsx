/* "Sprite component", v. 0.5 - 10.10.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is Sprite Component for React with TypeScript. */
/* Example for use in application: <Sprite id="logo" /> */

import React from 'react';
import sprite from './Sprite.svg';

interface SpriteProps {
  id: string;
}

const Sprite: React.FC<SpriteProps> = ({ id }) => (
  <svg className={id}>
    <use href={`${sprite}#${id}`}></use>
    {/* <use xlinkHref={`${sprite}#${id}`}></use> */}
  </svg>
);

export default Sprite;


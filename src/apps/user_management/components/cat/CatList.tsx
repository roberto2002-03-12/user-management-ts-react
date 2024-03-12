import React from 'react';
import { CatCard } from './CatCard'
import '../../styles/CatStyle.css';
import { ICat } from '../../models';

export const CatList = ({cats, innerRef}: {cats: ICat[]; innerRef?: React.Ref<HTMLParagraphElement>}) => {
  return (
    <div className='cat-list'>
      <div className="row">
        {
          cats.map((cat, index) => (
            <CatCard cat={cat} key={index} innerRef={innerRef}/>
          ))
        }
      </div>
    </div>
  )
}

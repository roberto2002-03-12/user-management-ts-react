import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ICat } from '../../models';

export const CatCard = ({cat, innerRef} : { cat: ICat; innerRef?: React.Ref<HTMLParagraphElement> }) => {

  return (
    <div className="cat-card col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" ref={innerRef}>
      <Card sx={{ maxWidth: 345, width: 345 }}>
        <CardMedia
          component="img"
          alt="cat photo"
          height="140"
          image={cat.photoUrl !== undefined && cat.photoUrl !== null ? cat.photoUrl : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { cat.name }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cat race: { cat.race }
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Cat birth: { cat.birth }
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Price: S/.{ cat.price }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Favorite</Button>
          <Button size="small">BUY IT!</Button>
        </CardActions>
      </Card>
    </div>
  )
}

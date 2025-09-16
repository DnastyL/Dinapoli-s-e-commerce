'use client';

import { Rating, RatingStyleTypes } from "@material-tailwind/react"
import { color } from "@material-tailwind/react/types/components/alert";

export const RatingComponent = (props: {rating: number, color: color}) => {
    return <Rating className="max-w-10"  value={props.rating} unratedColor={props.color} ratedColor={props.color} readonly/>
}
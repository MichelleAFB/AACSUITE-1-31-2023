import { Image, Video, Transformation } from "cloudinary-react";

import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";

/*
export const myImage = new CloudinaryImage('samples/Warriors-3-51238c51db_t6xt2m.jpg', {cloudName: 'michelle-badu'}).resize(fill().width(150).height(150));
*/

export const myImage = new CloudinaryImage(
  "samples/Warriors-3-51238c51db_t6xt2m.jpg",
  { cloudName: "michelle-badu" }
).resize(fill().width(150).height(150));

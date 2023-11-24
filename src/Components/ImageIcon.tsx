import { ReactNode,  ImgHTMLAttributes } from "react";
import classnames from "classnames"

interface ImageIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  img: string;
  className?: string;
  children?: ReactNode;
}

const ImageIcon = ({ img,className, ...rest  }: ImageIconProps) => {
  const allClassNames = classnames(className )
  return (
    <img src={`/images/${img}.svg`}  alt="" className={`${allClassNames}`} {...rest}/>
  )
}

export default ImageIcon
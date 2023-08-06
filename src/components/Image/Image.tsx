import React from 'react'
import styled from 'styled-components'
import Loading from '@components/Loading/Loading'

interface ImageWrapperProps {
  isLoading: boolean
  src: string
  alt: string
  width: number
  height: number
  style?: React.CSSProperties
}

const Img = styled.img`
  display: inline-block;
  font-size: 0;
`

const Image: React.FC<ImageWrapperProps> = ({
  isLoading,
  src,
  alt,
  width,
  height,
  style
}) => {
  return <>
    {isLoading
      ? <Loading />
      : <Img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={style} />
    }
   </>
}

export default Image

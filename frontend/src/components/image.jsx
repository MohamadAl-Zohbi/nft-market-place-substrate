import defaultImg from '@img/default-image.png'

function Image({ src, className, style }) {

  return (
    <img
      src={src}
      alt=""
      className={className}
      style={style}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = defaultImg;
      }}
    />
  )
}

export default Image;

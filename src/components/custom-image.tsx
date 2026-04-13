import Image from 'next/image'

export const CustomImage = (props: any) => {
  return (
    <Image
      alt={props.alt}
      src={props.src}
      width={props.width}
      height={props.height}
      className="rounded-lg shadow-md"
    />
  )
}
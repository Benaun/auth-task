export const Title = ({
  text,
  className
}: {
  text: string
  className: string
}) => {
  return (
    <div
      className={`w-full flex items-center justify-center text-center text-black font-semibold ${className}`}
    >
      <h1>{text}</h1>
    </div>
  )
}

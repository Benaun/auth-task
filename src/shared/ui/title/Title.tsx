export const Title = ({ text, height, size }: { text: string, height: string, size: string }) => {
    return <div className={`w-full h-${height} flex items-center justify-center text-center text-black text-${size} font-semibold`}>
        <h1>{text}</h1>
    </div>
}
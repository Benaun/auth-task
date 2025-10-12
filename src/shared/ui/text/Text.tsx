export const Text = ({ text }: { text: string }) => {
    return <div className='w-full h-12 flex items-center justify-center text-center text-black text-sm mb-6'>
        <p className="flex w-[270px]">{text}</p>
    </div>
}
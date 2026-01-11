const AnimatedBackground = () => {
  return (
    <div className="absolute h-[12%] top-0 inset-x-0 md:inset-x-20 z-[-1] lg:inset-x-64">
        <div
            className="
            absolute
            w-32 h-32
            bg-gradient-to-br from-purple-500/40 to-pink-500/40
            rounded-full
            blur-3xl
            animate-float
            top-10 left-10
            lg:size-52
            lg:-left-20
            "
        />

        {/* Bola 2 */}
        <div
            className="
            absolute
            w-36 h-36
            bg-gradient-to-br from-cyan-400/30 to-blue-500/30
            rounded-full
            blur-3xl
            animate-float-slow
            bottom-10 right-20
            lg:size-52
            lg:right-0
            "
        />
    </div>
  )
}

export default AnimatedBackground
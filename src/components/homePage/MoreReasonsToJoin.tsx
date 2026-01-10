import { moreReasonsToJoin } from "@/lib/data/moreReasonsToJoin"

const MoreReasonsToJoin = () => {
  return (
    <div className='w-full my-20'>
        <h1 className="text-xl md:text-2xl">More Reaseons to Join</h1>
        <section className="grid gap-2 mt-10 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {moreReasonsToJoin.map(item => (
                <div key={item.id} className="rounded-lg p-4 bg-gradient-to-br from-blue-500/25 via-purple-900/20 to-red-900/25  hover:-translate-y-2 duration-200 hover:bg-white/10">
                    <h1 className="mb-6 text-xl md:text-2xl md:mb-10 lg:text-xl lg:mb-6">{item.title}</h1>
                    <h3 className="mb-8 md:text-lg md:mb-12 lg:text-base">{item.content}</h3>
                    <item.icon size={32} className="ml-auto"/>
                </div>
            ))}
        </section>
    </div>
  )
}

export default MoreReasonsToJoin
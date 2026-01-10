import { pricingPlans } from '@/lib/data/pricingPlans'
import { CheckCheck } from 'lucide-react'

const PricingPlans = () => {
  return (
    <div className='my-20 w-full'>
        <h1 className="text-xl md:text-2xl">More Reasons to Join</h1>
        <section className='flex flex-col items-center gap-4 mt-10 md:flex-row md:items-stretch lg:gap-10 lg:justify-center md:mt-16'>
            {pricingPlans.map(item => (
                <div key={item.id} className={`min-w-72 rounded-xl px-6 py-8 bg-gradient-to-br from-blue-500/40 via-purple-900/40 to-red-900/40 text-white/80 text-sm duration-300 lg:hover:scale-110 md:flex-1 relative md:pb-16 hover:scale-105 hover:bg-white/10 md:min-w-0 lg:min-h-[500px] lg:max-w-80 ${item.highlighted ? "md:-translate-y-8 lg:-translate-y-12" : ""} lg:hover:scale-[103%]`}>
                    <h1 className="text-center rounded-full font-bold text-xl md:text-2xl">{item.title}</h1>
                    <h2 className="mt-2 text-center mb-8 md:text-lg">{item.price} / {item.period}</h2>
                    <ul className="space-y-2 mt-4 mb-16 lg:text-lg">
                        {item.features.map((item, index) => (
                            <li key={index} className='flex items-center gap-2 font-medium'><CheckCheck />{item}</li>
                        ))}
                    </ul>
                    <div className="text-center mt-6">
                    <button className="bg-white font-bold text-blue-900 w-full px-15 py-2  rounded-full cursor-pointer hover:bg-white/80 active:bg-white/60 md:absolute md:right-1/2 md:translate-x-1/2 md:w-4/5 md:bottom-4 ">Subscribe</button>
                    </div>
                </div>
            ))}
        </section>
    </div>
  )
}

export default PricingPlans
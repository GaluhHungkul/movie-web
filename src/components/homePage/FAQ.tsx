"use client"

import { faqList } from "@/lib/data/faqList"
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react"

type Faq = {
    id: number;
    question: string;
    answer: string; 
}

const FAQ = () => {

    const [showFaq, setShowFaq] = useState<Faq | null>(null)

    const handleToggleShowFaq = (value:Faq) => {
        setShowFaq(p => {
            if(!p) return value
            return p.id === value.id ? null : value
        })
    }

  return (
    <div className="w-full my-20 ">
        <h1 className="text-xl">Frequently Asked Questions</h1>
        <section className="mt-5 space-y-2">
            {faqList.map(item => (
                <div key={item.id}  className={`bg-white/10  cursor-pointer ${item.id === showFaq?.id ? "bg-white/20" : ""}`}>
                    <section onClick={() => handleToggleShowFaq(item)} className="flex justify-between hover:bg-white/15 items-center p-4">
                        <h1>{item.question}</h1>
                        <ChevronRight className={showFaq?.id === item.id ? "rotate-90" : ""}/>
                    </section>
                    <AnimatePresence>
                        {showFaq?.id === item.id && (
                            <motion.div 
                            className="px-4 py-6 border-t-2 border-black">
                                {item.answer}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </section>
    </div>
  )
}

export default FAQ
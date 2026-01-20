"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Heading from "../common/Heading";
import MutedText from "../common/MutedText";
import { faqListItems } from "@/lib/data/categories";


const FAQ = () => {


  return (
    <div className="container">
        <Heading>Frequently Asked Questions</Heading>
        <MutedText>Find instant answers to everything you need to know about StreamVibe-from account setup to streaming quality, billing to device compatibility Still curious? Our support team is just a click away.</MutedText>
        <Accordion
            type="single"
            collapsible
            className="w-full grid md:grid-cols-2 gap-4"
        >
            {faqListItems.map(item => (
                <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger className="items-center">
                        <div className="justify-start flex items-center gap-4">
                            <span className="bg-black-12 shrink-0 size-12 rounded-lg text-center content-center ring ring-black-15">{item.id}</span>
                            <h1>{item.title}</h1>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        Our flagship product combines cutting-edge technology with sleek
                        design. Built with premium materials, it offers unparalleled
                        performance and reliability.
                    </p>
                    <p>
                        Key features include advanced processing capabilities, and an
                        intuitive user interface designed for both beginners and experts.
                    </p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
  )
}

export default FAQ
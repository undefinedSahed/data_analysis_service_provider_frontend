"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"

const faqData = [
    {
        id: "item-1",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "item-2",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        id: "item-3",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    },
    {
        id: "item-4",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
    {
        id: "item-5",
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
]

export default function FAQSection() {
    const [openItem, setOpenItem] = useState("item-1")

    return (
        <section className="py-8 lg:py-20 bg-[#EBF7FD]" id="faq">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10 lg:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base md:text-lg lg:text-[20px] text-[#3F3F3F] max-w-3xl mx-auto leading-relaxed text-justify lg:text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    </p>
                </div>

                {/* FAQ Accordion */}
                <Accordion
                    type="single"
                    collapsible
                    value={openItem}
                    onValueChange={setOpenItem}
                    className="space-y-2"
                    defaultValue="item-1"
                >
                    {faqData.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-lg bg-white shadow-sm">
                            <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 text-left hover:no-underline hover:bg-gray-50 rounded-lg [&[data-state=open]]:rounded-b-none [&>svg]:hidden">
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-base md:text-xl lg:text-[20px] font-medium text-[#3F3F3F] pr-4">
                                        {faq.question}
                                    </span>
                                    <div className="flex-shrink-0 ml-4">
                                        {openItem === faq.id ? (
                                            <Minus className="h-5 w-5 md:h-6 md:w-6 text-white bg-primary rounded-full" />
                                        ) : (
                                            <Plus className="h-5 w-5 md:h-6 md:w-6 text-white bg-primary rounded-full" />
                                        )}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                                <p className="text-[#424242] leading-relaxed">{faq.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

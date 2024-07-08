import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabSliderProps {
    tabs: string[];
    children: ReactNode[];
}

const TabSlider = ({ tabs, children }: TabSliderProps) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="flex flex-col xs:flex-row">
                {tabs.map((tab, i) => (
                    <button
                        type="button"
                        onClick={() => setActiveTab(i)}
                        key={tab + i}
                        className={`${activeTab === i ? "bg-primary text-white" : "bg-gray-light text-primary"} w-full p-2 uppercase text-sm ${i < tabs.length - 1 && "border-r-[1px] border-[#AFAFAF]"}`}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="w-full overflow-hidden py-2 mt-4 border-t-2 border-[#1515151f] border-solid">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default TabSlider;

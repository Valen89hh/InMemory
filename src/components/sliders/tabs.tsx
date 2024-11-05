import { useState, ReactNode, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabSliderProps {
    tabs: string[];
    children: ReactNode[];
}

const TabSlider = ({ tabs, children }: TabSliderProps) => {
    const [activeTab, setActiveTab] = useState(0);

    // Memoriza los componentes de cada tab al iniciarse para que mantengan su estado
    const tabContent = useMemo(() => children, [children]);

    return (
        <div className="flex-1 flex-col flex">
            <div className="flex flex-col xs:flex-row">
                {tabs.map((tab, i) => (
                    <button
                        type="button"
                        onClick={() => setActiveTab(i)}
                        key={tab + i}
                        className={`${activeTab === i ? "bg-primary text-white" : "bg-gray-light text-primary"} w-full p-2 uppercase text-sm ${i < tabs.length - 1 && "border-r-[1px] border-[#AFAFAF]"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-hidden py-2 mt-4 border-t-2 border-[#1515151f] border-solid">
                <AnimatePresence mode="wait">
                    {tabContent.map((content, index) => (
                        <motion.div
                            className="h-full"
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: activeTab === index ? 1 : 0, x: activeTab === index ? 0 : -100 }}
                            exit={{ opacity: 0 }}
                            style={{ display: activeTab === index ? "block" : "none" }}
                            transition={{ duration: 0.3 }}
                        >
                            {content}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TabSlider;

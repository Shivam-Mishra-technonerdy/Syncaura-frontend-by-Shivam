import { motion } from "framer-motion";

const filters = [
  { key: "all", label: "All" },
  { key: "ongoing", label: "Ongoing" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

export default function FilterTabs({ activeFilter, setActiveFilter }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div
        className="
          bg-[#EDEDED] dark:bg-[#383838]
          w-[260px] h-[30px]          
          sm:w-96 sm:h-auto          
          flex items-center justify-between
          px-1
          rounded-[30px]             
          relative
        "
      >
        {filters.map((item) => {
          const isActive = activeFilter === item.key;

          return (
            <div key={item.key} className="relative flex-1">
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                  className="
                    absolute inset-0
                    bg-[#2461E6] dark:bg-[#73FBFD]
                    rounded-[30px] 
                  "
                />
              )}

              <p
                onClick={() => setActiveFilter(item.key)}
                className={`
                  relative z-10
                  h-[26px]              
                  flex items-center justify-center
                  text-[12px]           
                  sm:text-base          
                  cursor-pointer
                  whitespace-nowrap
                  text-[#000000] dark:text-[#D2D2D2]
                  ${isActive ? "text-white dark:text-black" : ""}
                `}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

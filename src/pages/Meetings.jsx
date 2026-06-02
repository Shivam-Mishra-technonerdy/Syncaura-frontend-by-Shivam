import { Funnel, RefreshCcw } from "lucide-react";
import { FaSearch, FaBars } from "react-icons/fa";
import MeetingCard from "../components/Meeting/Main/Card/MeetingCard";
import { useState, useMemo } from "react";
import ScheduleMeetingModal from "../components/Meeting/Main/Model/ScheduleMeetingModal";
import FilterTabs from "../components/Meeting/Main/Tab/FilterTabs";
import Sidebar from "../components/Meeting/Sidebar/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Meetings() {
  
  const { t } = useTranslation();

  const dispatch = useDispatch();

  
  const { meetings, isLoading, error } = useSelector(
    (state) => state.meeting
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
    dispatch(getMeetings());
    }
  }, [dispatch]);

 

  const getMeetingType = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now >= start && now <= end) return "ongoing";
    if (now < start) return "upcoming";
    return "past";
  };

 

  const handleFilterChange = (filter) => {
    const order = ["all", "upcoming", "ongoing", "past"];

    const currentIndex = order.indexOf(activeFilter);
    const nextIndex = order.indexOf(filter);

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveFilter(filter);
  };

  const filteredMeetings = useMemo(() => {
    if (activeFilter === "all") return meetings;
    return meetings.filter(
      (m) => getMeetingType(m.startTime, m.endTime) === activeFilter
    );
  }, [activeFilter, meetings]);

  return (
    <>
      {/* Sidebar Component */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="w-full min-h-screen bg-[#FFFFFF] dark:bg-black flex flex-col items-center">
        <div className="flex flex-col gap-5 w-full max-w-[1440px] px-3 sm:px-5 lg:px-10 py-4 sm:py-5">

          {/* Title + Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">

            {/* MOBILE & TABLET (below 1024px): Hamburger + Title + Sync Calendar */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <div className="flex items-center gap-3">
                {/* Hamburger menu for mobile & tablet */}
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="flex-shrink-0 p-1"
                  aria-label="Open menu"
                >
                  <FaBars className="text-2xl text-[#333] dark:text-gray-400" />
                </button>
                
                <h1 className="text-3xl sm:text-3xl font-bold text-[#000000] dark:text-[#F5F5F5]">
                  Meetings
                </h1>
              </div>

              <button className="flex items-center gap-2 px-3 py-2 rounded-2xl shadow-[0_3px_10px_0_rgba(0,0,0,0.25)] dark:bg-[#383838] flex-shrink-0">
                <RefreshCcw size={15} className="text-[#000000] dark:text-[#acaaaa]" />
                <p className="text-xs sm:text-sm font-medium text-[#000000] dark:text-[#D5D5D5] whitespace-nowrap">
                  Sync Calendar
                </p>
              </button>
            </div>

            {/* DESKTOP (1024px and above) */}
            <div className="hidden lg:flex flex-col gap-4 flex-1">
              <h1 className="text-2xl font-bold text-[#000000] dark:text-[#F5F5F5]">
                Meetings
              </h1>

              <p className="text-lg text-[#000000] dark:text-[#F5F5F5]">
                Manage your schedule and prepare for upcoming calls
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-[0_3px_10px_0_rgba(0,0,0,0.25)] dark:bg-[#383838]">
                <RefreshCcw size={15} className="text-[#000000] dark:text-[#acaaaa]" />
                <p className="text-sm font-medium text-[#000000] dark:text-[#D5D5D5]">
                  Sync Calendar
                </p>
              </button>
            </div>
          </div>

          {/* Filters + Search */}
          <div className="flex flex-col gap-3 w-full">
            {/* Mobile & Tablet (below 1024px) */}
            <div className="lg:hidden flex flex-col gap-3">
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex-1 min-w-0">
                  <FilterTabs
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                  />
                </div>
                <button className="bg-[#EDEDED] dark:bg-[#383838] rounded-3xl px-3 py-2 flex gap-2 items-center shrink-0">
                  <Funnel size={18} className="text-[#393838] dark:text-[#D2D2D2]" />
                  <p className="text-sm text-[#393838] dark:text-[#D2D2D2]">
                    Filter
                  </p>
                </button>
              </div>

              <div className="w-full">
                <div className="flex items-center px-4 py-2.5 rounded-[30px] bg-[#EDEDED] dark:bg-[#383838] border border-[#E0DDDD] w-full">
                  <FaSearch className="text-base text-[#8a8f99] flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search meetings, documents..."
                    className="w-full text-sm text-[#393838] dark:text-[#D2D2D2] placeholder:text-sm bg-transparent dark:placeholder:text-[#D5D5D5] outline-none border-none pl-3"
                  />
                </div>
              </div>
            </div>

            {/* Desktop (1024px and above) */}
            <div className="hidden lg:flex items-center justify-between w-full gap-3">
              <div className="flex-1">
                <FilterTabs
                  activeFilter={activeFilter}
                  setActiveFilter={handleFilterChange}
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="bg-[#EDEDED] dark:bg-[#383838] rounded-3xl px-3 py-2 flex gap-2 items-center shrink-0">
                  <Funnel size={20} className="text-[#393838] dark:text-[#D2D2D2]" />
                  <p className="text-sm text-[#393838] dark:text-[#D2D2D2]">
                    Filter
                  </p>
                </button>

                <div className="w-[260px]">
                  <div className="flex items-center px-3 py-2 rounded-[30px] bg-[#EDEDED] dark:bg-[#383838] border border-[#E0DDDD] w-full">
                    <FaSearch className="text-lg text-[#8a8f99]" />
                    <input
                      type="text"
                      placeholder="Search meetings, documents..."
                      className="w-full text-sm text-[#393838] dark:text-[#D2D2D2] placeholder:text-sm bg-transparent dark:placeholder:text-[#D5D5D5] outline-none border-none pl-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-[#E0DDDD] dark:bg-[#575757]" />
        </div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap mt-5 gap-5 sm:gap-9 justify-center items-center w-full max-w-[1440px] px-3 pb-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeFilter}
              custom={direction}
              initial={{ x: direction === 1 ? 150 : -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -150 : 150, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-5 sm:gap-9 justify-center items-center"
            >
              {filteredMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} {...meeting} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {modalOpen && (
          <ScheduleMeetingModal
            onClose={() => setModalOpen(false)}
            onSave={(meeting) => setMeetings((prev) => [meeting, ...prev])}
          />
        )}
      </div>
    </>
  );
}

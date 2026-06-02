import { Video, Camera, Monitor, ArrowRight } from "lucide-react";
import { TbBrandGoogleDrive, TbBrandTeams } from "react-icons/tb";
import { useSelector } from "react-redux";

function getMeetingStatus(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : null;

  const isToday = start.toDateString() === now.toDateString();
  const isPast = end ? now > end : now > start;

  const isLive =
    isToday && end && now >= start && now <= end;

  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  if (isPast) {
    return {
      label: "COMPLETED",
      textColor: "text-gray-500",
      bgColor: "bg-gray-100",
      dotColor: "bg-gray-400",
    };
  }

  if (isLive) {
    return {
      label: "LIVE NOW",
      textColor: "text-[#C71212]",
      bgColor: "bg-[#FBB7B7]",
      dotColor: "bg-[#F35353]",
    };
  }

  if (isToday) {
    return {
      label: "TODAY",
      textColor: "text-[#2461E6]",
      bgColor: "bg-[#D5F7F7]",
      dotColor: "bg-[#2461E6]",
    };
  }

  if (start.toDateString() === tomorrow.toDateString()) {
    return {
      label: "TOMORROW",
      textColor: "text-[#2461E6]",
      bgColor: "bg-[#D5F7F7]",
      dotColor: "bg-[#2461E6]",
    };
  }

  return {
    label: start.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    textColor: "text-[#2461E6]",
    bgColor: "bg-[#D5F7F7]",
    dotColor: "bg-[#2461E6]",
  };
}

function formatMeetingTime(startTime, endTime) {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : null;

  const format = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!end) return format(start);

  return `${format(start)} - ${format(end)}`;
}

export default function MeetingCard({
  platform,
  title,
  startTime,
  endTime,
  avatarCount,
  isDoc
}) {
  const isDark = useSelector((state) => state.theme.isDark);
  const status = getMeetingStatus(startTime, endTime);

  const MAX_VISIBLE = 3;
  const visibleAvatars = Math.min(avatarCount, MAX_VISIBLE);
  const extraCount = avatarCount > MAX_VISIBLE ? avatarCount - MAX_VISIBLE : 0;

  const isCompleted = status.label === "COMPLETED";
  const now = new Date();
  const startDateTime = new Date(startTime);
  const isUpcoming = startDateTime > now;

  return (
    <>
      {/* Mobile-only card (hidden on sm and above) - UPDATED with button below icons */}
      <div className="
        block sm:hidden
        w-[350px] h-[153px]
        rounded-[20px]
        bg-white dark:bg-[#2E2F2F]
        shadow-[0px_0px_10px_3px_#D2D2D233]
        px-4 py-3
        flex flex-col
        justify-between
      ">
        {/* Top Row: Platform + Status - POSITIONS SWAPPED (ONLY IN MOBILE) */}
        <div className="flex items-center justify-between">
          {/* Platform moved to LEFT (MOBILE ONLY) */}
          <div className="flex items-center gap-1 text-xs text-black dark:text-[#F5F5F5]">
            {platform === "Zoom" ? (
              <Video className="size-3.5" />
            ) : platform === "Google Meet" ? (
              <TbBrandGoogleDrive className="size-3.5" />
            ) : (
              <TbBrandTeams className="size-3.5" />
            )}
            {platform === "Google Meet" ? "Meet" : platform}
          </div>

          {/* Status moved to RIGHT (MOBILE ONLY) */}
          <span
            className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full
              ${status.textColor} ${status.bgColor}`}
          >
            <span className={`size-1.5 rounded-full ${status.dotColor}`} />
            {status.label}
          </span>
        </div>

        {/* Middle Row: Title + Time */}
        <div className="flex flex-col gap-1">
          <h3 className="
            font-semibold
            text-sm
            leading-tight
            text-gray-900 dark:text-[#F5F5F5]
            line-clamp-1
          ">
            {title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-[#F5F5F5]">
            <span className="size-3 flex items-center justify-center">
              <img
                src={
                  isDark
                    ? "/images/Meeting/dark/clock.png"
                    : "/images/Meeting/clock.png"
                }
                alt="clock"
                className="w-full h-full object-contain"
              />
            </span>
            <p className="whitespace-nowrap">{formatMeetingTime(startTime, endTime)}</p>
          </div>
        </div>

        {/* Bottom Row: Modified to place button below icons */}
        <div className="flex items-start justify-between">
          {/* Avatars - stays on left */}
          <div className="flex items-center -space-x-4 pt-1">
            <div className="flex -space-x-2">
              {Array.from({ length: visibleAvatars }).map((_, i) => (
                <img
                  key={i}
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
                  className="size-6 rounded-full border border-white"
                  alt={`Avatar ${i + 1}`}
                />
              ))}
            </div>

            {extraCount > 0 && (
              <span className="
                size-6
                text-[10px]
                font-semibold
                flex items-center justify-center
                text-black bg-[#E0DDDD]
                rounded-full border border-white
                z-10
              ">
                +{extraCount}
              </span>
            )}
          </div>

          {/* Right side: Icons with button below */}
          <div className="flex flex-col items-end gap-1">
            {/* Icons row */}
            <div className="flex items-center gap-2">
              <img
                src={
                  isDark
                    ? "/images/Meeting/dark/user.png"
                    : "/images/Meeting/user.png"
                }
                className={isDark ? "h-4 w-5" : "size-4"}
                alt="user"
              />
              {isDoc && <img
                src={
                  isDark
                    ? "/images/Meeting/dark/document.png"
                    : "/images/Meeting/document.png"
                }
                className="size-4"
                alt="document"
              />}
            </div>

            {/* Button below icons */}
            <button
              disabled={isCompleted}
              className={`
                px-3 py-1.5
                rounded-full
                flex items-center justify-center
                text-xs font-semibold
                shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]
                transition
                min-w-[100px]
                ${isCompleted
                  ? "bg-red-500 dark:bg-[#1E293B] dark:text-[#94A3B8] text-yellow-300 cursor-not-allowed"
                  : isUpcoming
                    ? "bg-[#D9D9D9] dark:bg-[#5e5c5c] dark:text-[#73FBFD] text-gray-700 cursor-pointer"
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-[#73FBFD] dark:text-[#2E2F2F] text-white"
                }
              `}
            >
              {isCompleted
                ? "Completed"
                : isUpcoming
                  ? <div className="flex items-center justify-center gap-1">
                    <ArrowRight className="size-3 dark:text-[#73FBFD]" />
                    <span className="whitespace-nowrap">Details</span>
                  </div>
                  : "Join Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop card (hidden on mobile) - COMPLETELY UNCHANGED */}
      <div className="
        hidden sm:block
        w-[270px]
        xl:w-[280px]
        rounded-[20%_20%]
        bg-white dark:bg-[#2E2F2F]
        shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]
        px-5 md:px-4 xl:px-7 
        py-8 md:py-6 sm:py-7 2xl:py-8
        space-y-3
        transition
      ">
        {/* Status + Platform - UNCHANGED (Status on LEFT, Platform on RIGHT) */}
        <div className="flex items-center justify-between">
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
              ${status.textColor} ${status.bgColor}`}
          >
            <span className={`size-2 rounded-full ${status.dotColor}`} />
            {status.label}
          </span>

          <div className="flex items-center gap-1 text-sm text-black dark:text-[#F5F5F5]">
            {platform === "Zoom" ? (
              <Video className="size-5" />
            ) : platform === "Google Meet" ? (
              <TbBrandGoogleDrive className="size-5" />
            ) : (
              <TbBrandTeams className="size-5" />
            )}
            {platform === "Google Meet" ? "Meet" : platform}
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 h-23">
          <h3 className="
            font-semibold
            text-xl 2xl:text-2xl
            leading-snug
            text-gray-900 dark:text-[#F5F5F5]
            line-clamp-2
          ">
            {title}
          </h3>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#F5F5F5]">
            <span className="size-5 flex items-center justify-center">
              <img
                src={
                  isDark
                    ? "/images/Meeting/dark/clock.png"
                    : "/images/Meeting/clock.png"
                }
                alt="clock"
              />
            </span>
            <p>{formatMeetingTime(startTime, endTime)}</p>
          </div>
        </div>

        {/* Avatars */}
        <div className="flex items-center -space-x-6 gap-2">
          <div className="flex -space-x-3">
            {Array.from({ length: visibleAvatars }).map((_, i) => (
              <img
                key={i}
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
                className="size-8 2xl:size-9 rounded-full border-2 border-white"
              />
            ))}
          </div>

          {extraCount > 0 && (
            <span className="size-8 text-sm font-semibold flex items-center justify-center text-black bg-[#E0DDDD] rounded-full border border-white">
              +{extraCount}
            </span>
          )}
        </div>

        <div className="h-px w-full bg-[#E0DDDD] dark:bg-black" />

        {/* Actions */}
        <div className="flex items-center gap-6 justify-center pt-2">
          <button
            disabled={isCompleted}
            className={`
              px-8 py-2
              rounded-full
              flex items-center justify-center
              text-sm font-semibold 
              shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]
              transition
              ${isCompleted
                ? "bg-red-500 dark:bg-[#1E293B] dark:text-[#94A3B8] text-yellow-300 cursor-not-allowed"
                : isUpcoming
                  ? "bg-[#D9D9D9] dark:bg-[#5e5c5c] dark:text-[#73FBFD] text-gray-700 cursor-pointer"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-[#73FBFD] dark:text-[#2E2F2F] text-white"
              }
            `}
          >
            {isCompleted
              ? "Completed"
              : isUpcoming
                ? <div className="flex items-center justify-center gap-5">
                  <ArrowRight className="size-5 dark:text-[#73FBFD]" /> <span>Details</span>
                </div>
                : "Join Now"}
          </button>

          <div className="flex items-center gap-3">
            <img
              src={
                isDark
                  ? "/images/Meeting/dark/user.png"
                  : "/images/Meeting/user.png"
              }
              className={isDark ? "h-6 w-8" : "size-6"}
            />
            {isDoc && <img
              src={
                isDark
                  ? "/images/Meeting/dark/document.png"
                  : "/images/Meeting/document.png"
              }
              className="size-6"
            />}
          </div>
        </div>
      </div>
    </>
  );
}

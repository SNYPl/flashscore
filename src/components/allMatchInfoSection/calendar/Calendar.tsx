"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./style.module.css";
import DatePicker from "./DatePicker";

interface calendarProps {
  activeIndex: any;
  setActiveIndex: any;
}

const Calendar: React.FC<calendarProps> = ({ activeIndex, setActiveIndex }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.toDateString());

  const calendarOptionsRef = useRef<HTMLDivElement>(null);

  const generateDateOptions = () => {
    const options = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = -7; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const dayOfWeek = daysOfWeek[date.getDay()];

      options.push({
        id: i,
        day,
        dayOfWeek,
        month,
        fullDate: date.toDateString(),
      });
    }

    return options;
  };

  const dateOptions = generateDateOptions();

  const scrollToActiveDate = (index: number) => {
    const calendarOptions = calendarOptionsRef.current;
    const dateDiv = calendarOptions?.children[index] as HTMLDivElement;

    // if (dateDiv) {
    //   dateDiv.scrollIntoView({ behavior: "smooth", inline: "center" });
    // }
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    scrollToActiveDate(activeIndex);
  }, [activeIndex]);

  // Drag to Scroll
  useEffect(() => {
    const calendarOptions = calendarOptionsRef.current;
    if (!calendarOptions) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - calendarOptions.offsetLeft;
      scrollLeft = calendarOptions.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - calendarOptions.offsetLeft;
      const walk = (x - startX) * 3; // Scroll speed
      calendarOptions.scrollLeft = scrollLeft - walk;
    };

    calendarOptions.addEventListener("mousedown", handleMouseDown);
    calendarOptions.addEventListener("mouseleave", handleMouseLeave);
    calendarOptions.addEventListener("mouseup", handleMouseUp);
    calendarOptions.addEventListener("mousemove", handleMouseMove);

    return () => {
      calendarOptions.removeEventListener("mousedown", handleMouseDown);
      calendarOptions.removeEventListener("mouseleave", handleMouseLeave);
      calendarOptions.removeEventListener("mouseup", handleMouseUp);
      calendarOptions.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className={`${style.calendar} `}>
      <div className={`${style.calendarOptions} `} ref={calendarOptionsRef}>
        {dateOptions.map((el: any) => {
          const { day, dayOfWeek, id } = el;
          const dayWeek = dayOfWeek.toUpperCase();

          return (
            <div
              className={`${
                style.calendarDate
              } flex items-center justify-center flex-col ${
                activeIndex === id ? style.activeDate : ""
              }`}
              key={id}
              onClick={() => {
                setSelectedDate(el);
                setActiveIndex(id);
              }}
            >
              <h4 className="font-extrabold text-base text-gey-league">
                {day}
              </h4>
              <span className="text-xs text-gey-league font-semibold">
                {dayWeek}
              </span>
            </div>
          );
        })}
      </div>
      <article className={`${style.calendarPicker}`}>
        <DatePicker
          onDateChange={handleDateChange}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          generateDateOptions={generateDateOptions}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </article>
    </section>
  );
};

export default Calendar;

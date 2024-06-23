"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";
import { CalendarIcon } from "@/common/svg/home";

const DatePicker = ({
  onDateChange,
  selectedDate,
  setSelectedDate,
  generateDateOptions,
  activeIndex,
  setActiveIndex,
}: {
  onDateChange: any;
  selectedDate: any;
  setSelectedDate: any;
  generateDateOptions: any;
  activeIndex: Number | String;
  setActiveIndex: (id: any) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDateSelect = (date: any, index: number) => {
    setSelectedDate(date);
    setActiveIndex(index);
    setIsDropdownOpen(false);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const handleNavigation = (direction: any) => {
    const options = generateDateOptions();
    const currentIndex = options.findIndex(
      (date: any) => date === selectedDate
    );
    if (direction === "prev" && currentIndex > 0) {
      setSelectedDate(options[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < options.length - 1) {
      setSelectedDate(options[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.datepicker}>
      <div className={styles.calendarIcon} onClick={toggleDropdown}>
        <button className={styles.icon}>
          <CalendarIcon />
        </button>
      </div>
      {isDropdownOpen && (
        <ul className={styles.dropdown} ref={dropdownRef}>
          {generateDateOptions().map((date: any, index: any) => {
            const { day, dayOfWeek, month, id } = date;
            const dayWeek = dayOfWeek.toUpperCase();

            return (
              <li key={id}>
                <button
                  className={`${styles.dateOption} ${
                    id === activeIndex ? styles.active : ""
                  }`}
                  onClick={() => handleDateSelect(date, id)}
                >
                  {`${day}/${month} ${dayWeek}`}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DatePicker;

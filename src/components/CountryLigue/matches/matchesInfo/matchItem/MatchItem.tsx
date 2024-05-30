import React from "react";
import style from "./style.module.css";
import Link from "next/link";

const MatchItem = () => {
  return (
    <section className={`${style.matchItem}`}>
      <p>1</p>
      <div>
        svg <h2>Arsenal</h2>
      </div>
      <p>37</p>
      <p>27</p>
      <p>5</p>
      <p>5</p>
      <p>89:28</p>
      <p>61</p>
      <p>86</p>
      <div>
        <p>?</p>
        <p>W</p>
        <p>W</p>
        <p>W</p>
        <p>W</p>
      </div>
    </section>
  );
};

export default MatchItem;

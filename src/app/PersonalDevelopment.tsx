"use client";

import Link from "next/link";
import { FaUniversity } from "react-icons/fa";

export default function PersonalDevelopment() {
  return (
    <div className="card personaldev">
      <FaUniversity className="icon" />
      <h2>Personal Development</h2>
      <ul>
        <li>
          <Link href="#reading-list">Reading List</Link>
        </li>
        <li>
          <Link href="#learning-goals">Learning Goals</Link>
        </li>
        <li>
          <Link href="#journal-reflections">Journal/Reflections</Link>
        </li>
      </ul>
    </div>
  );
}

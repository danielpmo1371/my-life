"use client";

import Link from "next/link";
import { FaLink } from "react-icons/fa";

export default function LinkToDocuments() {
  return (
    <div className="card doclinks">
      <FaLink className="icon" />
      <h2>Links to Key Documents</h2>
      <ul>
        <li>
          <Link href="#budget">Budget</Link>
        </li>
        <li>
          <Link href="#weekly-schedule">Weekly Schedule</Link>
        </li>
        <li>
          <Link href="#goals">Goals</Link>
        </li>
        <li>
          <Link href="#projects">Projects</Link>
        </li>
        <li>
          <Link href="#to-do-lists">To-Do Lists</Link>
        </li>
        <li>
          <Link href="#important-contacts">Important Contacts</Link>
        </li>
      </ul>
    </div>
  );
}

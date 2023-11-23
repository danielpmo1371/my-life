"use client";

import Link from "next/link";
import { FaAsterisk } from "react-icons/fa";

export default function Miscelaneous() {
  return (
    <div className="card miscsection">
      <FaAsterisk className="icon" />
      <h2>Miscellaneous</h2>
      <ul>
        <li>
          <Link href="#travel-plans">Travel Plans</Link>
        </li>
        <li>
          <Link href="#wish-list">Wish List</Link>
        </li>
        <li>
          <Link href="#important-dates">Important Dates</Link>
        </li>
      </ul>
    </div>
  );
}

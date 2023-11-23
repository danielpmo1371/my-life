"use client";

import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";

export default function HealthAndWellness() {
  return (
    <div className="card health">
      <FaHeartbeat className="icon" />
      <h2>Health and Wellness</h2>
      <ul>
        <li>
          <Link href="#fitness-plan">Fitness Plan</Link>
        </li>
        <li>
          <Link href="#meal-plans">Meal Plans</Link>
        </li>
        <li>
          <Link href="#medical-records">Medical Records</Link>
        </li>
      </ul>
    </div>
  );
}

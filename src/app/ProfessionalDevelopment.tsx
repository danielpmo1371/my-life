"use client";

import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";

export default function ProfessionalDevelopment() {
  return (
    <div className="card profdev">
      <FaBriefcase className="icon" />
      <h2>Professional Development</h2>
      <ul>
        <li>
          <Link href="#career-goals">Career Goals</Link>
        </li>
        <li>
          <Link href="#skill-development">Skill Development</Link>
        </li>
        <li>
          <Link href="#resume-cv">Resume/CV</Link>
        </li>
      </ul>
    </div>
  );
}

"use client";

import Link from "next/link";
import { FaPiggyBank, FaUniversity } from "react-icons/fa";

export default function FinancialPlan() {
  return (
    <div className="card finplan">
      <FaPiggyBank className="icon" />
      <h2>Financial Planning</h2>
      <ul>
        <li>
          <Link href="#investment-portfolio">Investment Portfolio</Link>
        </li>
        <li>
          <Link href="#retirement-plan">Retirement Plan</Link>
        </li>
        <li>
          <Link href="#debt-management">Debt Management</Link>
        </li>
      </ul>
    </div>
  );
}

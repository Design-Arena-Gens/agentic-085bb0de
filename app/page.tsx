"use client";

import { useMemo, useState } from "react";
import { PricingForm } from "@/app/components/PricingForm";
import { PricingSummary } from "@/app/components/PricingSummary";
import { PricingScenarioExplorer } from "@/app/components/PricingScenarioExplorer";
import {
  PricingInputs,
  calculateDynamicPrice,
} from "@/app/lib/pricing";

const initialInputs: PricingInputs = {
  operatingCost: 180,
  minimumProfitMargin: 0.22,
  seatsTotal: 180,
  seatsRemaining: 64,
  hoursToDeparture: 144,
  bookingVelocity: 3.2,
  competitorFare: 249,
  demandIndex: 0.56,
  pointOfSale: "North America",
  loyaltyTier: "Gold",
  historicalLoadFactor: 0.74,
};

export default function Home() {
  const [inputs, setInputs] = useState<PricingInputs>(initialInputs);
  const pricingResult = useMemo(
    () => calculateDynamicPrice(inputs),
    [inputs]
  );

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="hero__eyebrow">Airline Revenue OS</p>
          <h1>Dynamic Ticket Pricing Simulator</h1>
          <p className="hero__lead">
            Continuously priced fares that respond to inventory pressure,
            demand signals, and competitive posture in real time.
          </p>
        </div>
        <div className="hero__metrics">
          <div>
            <span className="hero__metrics-label">Algorithm Output</span>
            <span className="hero__metrics-value">
              ${pricingResult.recommendedPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="hero__metrics-label">Demand Regime</span>
            <span className="hero__metrics-value hero__metrics-secondary">
              {pricingResult.demandClassification}
            </span>
          </div>
        </div>
      </header>

      <div className="layout">
        <PricingForm inputs={inputs} onChange={setInputs} />
        <PricingSummary result={pricingResult} />
      </div>

      <PricingScenarioExplorer baseInputs={inputs} />
    </main>
  );
}


"use client";

import { PricingInputs, calculateDynamicPrice } from "@/app/lib/pricing";

interface PricingScenarioExplorerProps {
  baseInputs: PricingInputs;
}

const formatCurrency = (value: number) =>
  value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDelta = (base: number, scenario: number) => {
  const delta = scenario - base;
  const prefix = delta >= 0 ? "+" : "";
  return `${prefix}${formatCurrency(delta)} (${((delta / base) * 100).toFixed(
    1
  )}%)`;
};

export function PricingScenarioExplorer({
  baseInputs,
}: PricingScenarioExplorerProps) {
  const baseResult = calculateDynamicPrice(baseInputs);
  const scenarios = [
    {
      id: "last_seats",
      title: "Last-Minute Spike",
      description:
        "Seating inventory drops to the final cluster with minutes to departure.",
      inputs: {
        ...baseInputs,
        seatsRemaining: Math.max(4, Math.round(baseInputs.seatsTotal * 0.05)),
        hoursToDeparture: Math.max(1, baseInputs.hoursToDeparture / 4),
        bookingVelocity: baseInputs.bookingVelocity * 1.6,
      },
    },
    {
      id: "competitor_discount",
      title: "Competitor Undercut",
      description:
        "A rival carrier publishes a flash sale, forcing distortion downward.",
      inputs: {
        ...baseInputs,
        competitorFare: Math.max(baseInputs.operatingCost + 40, baseResult.basePrice * 0.75),
        demandIndex: Math.max(0.35, baseInputs.demandIndex - 0.1),
      },
    },
    {
      id: "surge_demand",
      title: "Event Demand Surge",
      description:
        "City-wide event drives outsized search volumes and willingness to pay.",
      inputs: {
        ...baseInputs,
        demandIndex: Math.min(0.95, baseInputs.demandIndex + 0.2),
        bookingVelocity: baseInputs.bookingVelocity * 1.9,
        historicalLoadFactor: Math.min(0.98, baseInputs.historicalLoadFactor + 0.08),
      },
    },
  ];

  return (
    <section className="panel">
      <header className="panel__header">
        <h2>Sensitivity Sandbox</h2>
        <p>
          Stress test the algorithm with preset operating scenarios to
          understand fare elasticity and guardrails.
        </p>
      </header>
      <div className="scenario-grid">
        {scenarios.map((scenario) => {
          const outcome = calculateDynamicPrice(scenario.inputs);
          return (
            <article key={scenario.id} className="scenario-card">
              <h3>{scenario.title}</h3>
              <p className="scenario-card__description">
                {scenario.description}
              </p>
              <div className="scenario-card__price">
                <span>{formatCurrency(outcome.recommendedPrice)}</span>
                <small>{formatDelta(baseResult.recommendedPrice, outcome.recommendedPrice)}</small>
              </div>
              <ul className="scenario-card__bullets">
                <li>
                  Floor {formatCurrency(outcome.floorPrice)} · Ceiling{" "}
                  {formatCurrency(outcome.ceilingPrice)}
                </li>
                <li>
                  Baseline shift:{" "}
                  {formatCurrency(outcome.recommendedPrice - baseResult.basePrice)}
                </li>
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}


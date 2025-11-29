"use client";

import { Adjustment, PricingResult } from "@/app/lib/pricing";

interface PricingSummaryProps {
  result: PricingResult;
}

const formatCurrency = (value: number) =>
  value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatPercent = (value: number) =>
  `${(value * 100).toFixed(1)}%`;

const classifyImpact = (impact: number) => {
  if (impact > 0.12) return "strong-up";
  if (impact > 0.02) return "mild-up";
  if (impact < -0.12) return "strong-down";
  if (impact < -0.02) return "mild-down";
  return "neutral";
};

const sortAdjustments = (adjustments: Adjustment[]) =>
  [...adjustments].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

export function PricingSummary({ result }: PricingSummaryProps) {
  const orderedAdjustments = sortAdjustments(result.adjustments);
  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2>Revenue Management Recommendation</h2>
          <p>
            Live fare guidance synthesizing cost, demand, and market intelligence.
          </p>
        </div>
        <div className={`badge badge--${result.demandClassification.toLowerCase()}`}>
          {result.demandClassification} demand
        </div>
      </header>

      <div className="pricing-grid">
        <article className="pricing-card">
          <h3>Recommended Fare</h3>
          <p className="pricing-card__value">
            {formatCurrency(result.recommendedPrice)}
          </p>
          <p className="pricing-card__hint">
            Floor {formatCurrency(result.floorPrice)} · Ceiling{" "}
            {formatCurrency(result.ceilingPrice)}
          </p>
        </article>

        <article className="pricing-card">
          <h3>Baseline Cost Structure</h3>
          <p className="pricing-card__value">{formatCurrency(result.basePrice)}</p>
          <p className="pricing-card__hint">
            Base cost + minimum profit corridor before dynamic inputs.
          </p>
        </article>
      </div>

      <div className="adjustment-table">
        <div className="adjustment-table__header">
          <span>Driver</span>
          <span>Weight</span>
          <span>Impact</span>
          <span>Commentary</span>
        </div>
        {orderedAdjustments.map((adjustment) => (
          <div
            key={adjustment.id}
            className={`adjustment-table__row ${classifyImpact(
              adjustment.impact
            )}`}
          >
            <span>{adjustment.label}</span>
            <span>{formatPercent(adjustment.factor)}</span>
            <span>{formatPercent(adjustment.impact)}</span>
            <span>{adjustment.rationale}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


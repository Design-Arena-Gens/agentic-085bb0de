"use client";

import { ChangeEvent } from "react";
import {
  LoyaltyTier,
  PointOfSale,
  PricingInputs,
} from "@/app/lib/pricing";

const posOptions: PointOfSale[] = [
  "North America",
  "Europe",
  "Latin America",
  "Middle East",
  "Asia Pacific",
];

const loyaltyOptions: LoyaltyTier[] = ["None", "Silver", "Gold", "Platinum"];

interface PricingFormProps {
  inputs: PricingInputs;
  onChange: (next: PricingInputs) => void;
}

const formatNumber = (value: number, fractionDigits = 0) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

export function PricingForm({ inputs, onChange }: PricingFormProps) {
  const handleNumberChange =
    (field: keyof PricingInputs) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      onChange({ ...inputs, [field]: Number.isFinite(value) ? value : 0 });
    };

  const handleSelectChange =
    (field: keyof PricingInputs) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange({ ...inputs, [field]: event.target.value });
    };

  return (
    <section className="panel">
      <header className="panel__header">
        <h2>Dynamic Pricing Controls</h2>
        <p>
          Tune demand drivers and market context to simulate a real-time fare
          recommendation.
        </p>
      </header>
      <div className="grid form-grid">
        <label className="field">
          <span className="field__label">Operating Cost (USD)</span>
          <input
            type="number"
            min={50}
            step={10}
            value={inputs.operatingCost}
            onChange={handleNumberChange("operatingCost")}
          />
        </label>

        <label className="field">
          <span className="field__label">Minimum Profit Margin (%)</span>
          <input
            type="number"
            min={5}
            max={90}
            step={1}
            value={Math.round(inputs.minimumProfitMargin * 100)}
            onChange={(event) =>
              onChange({
                ...inputs,
                minimumProfitMargin: Number(event.target.value) / 100,
              })
            }
          />
        </label>

        <label className="field">
          <span className="field__label">
            Seats Remaining ({formatNumber(inputs.seatsRemaining)})
          </span>
          <input
            type="range"
            min={0}
            max={inputs.seatsTotal}
            value={inputs.seatsRemaining}
            onChange={handleNumberChange("seatsRemaining")}
          />
        </label>

        <label className="field">
          <span className="field__label">
            Total Seats ({formatNumber(inputs.seatsTotal)})
          </span>
          <input
            type="number"
            min={40}
            max={400}
            step={1}
            value={inputs.seatsTotal}
            onChange={handleNumberChange("seatsTotal")}
          />
        </label>

        <label className="field">
          <span className="field__label">
            Hours Until Departure ({formatNumber(inputs.hoursToDeparture)})
          </span>
          <input
            type="range"
            min={1}
            max={720}
            value={inputs.hoursToDeparture}
            onChange={handleNumberChange("hoursToDeparture")}
          />
        </label>

        <label className="field">
          <span className="field__label">
            Booking Velocity (seats/hour) ({formatNumber(inputs.bookingVelocity, 1)})
          </span>
          <input
            type="range"
            min={0}
            max={12}
            step={0.1}
            value={inputs.bookingVelocity}
            onChange={handleNumberChange("bookingVelocity")}
          />
        </label>

        <label className="field">
          <span className="field__label">
            Competitor Fare (USD {formatNumber(inputs.competitorFare, 2)})
          </span>
          <input
            type="number"
            min={50}
            step={1}
            value={inputs.competitorFare}
            onChange={handleNumberChange("competitorFare")}
          />
        </label>

        <label className="field">
          <span className="field__label">
            Demand Index ({inputs.demandIndex.toFixed(2)})
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={inputs.demandIndex}
            onChange={handleNumberChange("demandIndex")}
          />
        </label>

        <label className="field">
          <span className="field__label">
            Historical Load Factor ({inputs.historicalLoadFactor.toFixed(2)})
          </span>
          <input
            type="range"
            min={0.5}
            max={0.98}
            step={0.01}
            value={inputs.historicalLoadFactor}
            onChange={handleNumberChange("historicalLoadFactor")}
          />
        </label>

        <label className="field">
          <span className="field__label">Point of Sale</span>
          <select
            value={inputs.pointOfSale}
            onChange={handleSelectChange("pointOfSale")}
          >
            {posOptions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Loyalty Tier</span>
          <select
            value={inputs.loyaltyTier}
            onChange={handleSelectChange("loyaltyTier")}
          >
            {loyaltyOptions.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}


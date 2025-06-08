export type StampDutyBand = {
  /**
   * The threshold up to which the rate applies. If undefined, then this is the max rate.
   */
  threshold?: number;

  /**
   * The rate to apply for the band.
   */
  rate: number;
};

export type StampDutyRates = {
  stampDutyBands: StampDutyBand[];
  firstTimeBuyerBands: StampDutyBand[];
  firstTimeBuyerThreshold: number;
};

// as of 2025-26
const stampDutyBands: StampDutyBand[] = [
  {
    threshold: 125_000,
    rate: 0,
  },
  {
    threshold: 250_000,
    rate: 0.02,
  },
  {
    threshold: 925_000,
    rate: 0.05,
  },
  {
    threshold: 1_500_000,
    rate: 0.1,
  },
  {
    rate: 0.12,
  },
];

const firstTimeBuyerBands: StampDutyBand[] = [
  {
    threshold: 300_000,
    rate: 0,
  },
  {
    rate: 0.05,
  },
];

export const stampDutyRates: StampDutyRates = {
  stampDutyBands,
  firstTimeBuyerBands,
  firstTimeBuyerThreshold: 500_000,
};

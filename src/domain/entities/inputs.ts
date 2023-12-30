import { MortgageParams } from "./mortgages";
import { RentParams } from "./rent";

export type InputParams = MortgageParams | RentParams;

export const isMortgageParams = (
  params: InputParams,
): params is MortgageParams => {
  return "loan" in params;
};

import { z } from "zod";

export const AppTabEnum = z.enum(["mortgage", "rent"]);

export const appSearchSchema = z.object({
  tab: AppTabEnum.catch(AppTabEnum.enum.mortgage),
  mortgageLoan: z.number().catch(300000),
  mortgageRate: z.number().catch(4.5),
  mortgageTerm: z.number().catch(20),
  propertyValue: z.number().catch(600000),
  firstTimeBuyer: z.boolean().catch(false),
  interestOnly: z.boolean().catch(false),
  rent: z.number().catch(1500),
  rentIncrease: z.number().catch(2),
  rentTerm: z.number().catch(25),
});

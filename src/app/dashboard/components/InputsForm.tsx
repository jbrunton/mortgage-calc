import { MortgageParamsForm } from "@app/mortgages/components/MortgageParamsForm";
import { RentParamsForm } from "@app/rent/components/RentParamsForm";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { MortgageParams } from "@entities/mortgages";
import { RentParams } from "@entities/rent";
import { FC } from "react";

export type InputsFormProps = {
  mortgageParams: MortgageParams;
  rentParams: RentParams;
};

export const InputsForm: FC<InputsFormProps> = ({
  mortgageParams,
  rentParams,
}) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Mortgage</Tab>
        <Tab>Rent</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <MortgageParamsForm params={mortgageParams} onChange={() => {}} />
        </TabPanel>
        <TabPanel>
          <RentParamsForm params={rentParams} onChange={() => {}} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

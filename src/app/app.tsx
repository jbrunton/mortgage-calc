import { useEffect, useState } from "react";
import {
  Heading,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { RouteApi, useNavigate } from "@tanstack/react-router";
import { ScenariosMenu } from "@app/scenarios/components/ScenariosMenu";
import { MortgageParams, MortgageSummary } from "@entities/mortgages";
import { calculateRepayments } from "@usecases/mortgages/calculate_repayments";
import { useSelectedScenarios } from "@app/scenarios/hooks/useSelectedScenario";
import { MortgagePage } from "@app/mortgages/pages/MortgagePage";
import { RentPage } from "@app/rent/pages/RentPage";
import { calculateRent } from "@usecases/rent/calculate_rent";
import { RentParams, RentSummary } from "@entities/rent";
import { isMortgageScenario } from "@entities/scenarios";
import { AppTabEnum } from "./app-search-params";
import { stampDutyRates } from "@usecases/mortgages/rates";

const appRoute = new RouteApi({ id: "/" });

export const App = () => {
  const search = appRoute.useSearch();
  const navigate = useNavigate({ from: appRoute.id });

  const mortgageParams: MortgageParams = {
    loan: search.mortgageLoan,
    rate: search.mortgageRate,
    term: search.mortgageTerm,
    propertyValue: search.propertyValue,
    firstTimeBuyer: search.firstTimeBuyer,
    interestOnly: search.interestOnly,
  };

  const setMortgageParams = (params: MortgageParams) => {
    navigate({
      search: (prev) => {
        const newParams = {
          ...prev,
          mortgageLoan: params.loan,
          mortgageRate: params.rate,
          mortgageTerm: params.term,
          propertyValue: params.propertyValue,
          firstTimeBuyer: params.firstTimeBuyer,
          interestOnly: params.interestOnly,
        };
        return newParams;
      },
    });
  };

  const rentParams: RentParams = {
    monthlyRent: search.rent,
    interestRate: search.rentIncrease,
    term: search.rentTerm,
  };

  const setRentParams = (params: RentParams) => {
    navigate({
      search: (prev) => ({
        ...prev,
        rent: params.monthlyRent,
        rentIncrease: params.interestRate,
        rentTerm: params.term,
      }),
    });
  };

  const [mortgageSummary, setMortgageSummary] = useState<MortgageSummary>();
  const [rentSummary, setRentSummary] = useState<RentSummary>();

  const {
    selectedScenario,
    scenarios,
    saveScenario,
    loadScenario,
    deleteScenario,
  } = useSelectedScenarios();

  const tabs = [AppTabEnum.enum.mortgage, AppTabEnum.Enum.rent];
  const tabIndex = tabs.indexOf(search.tab);
  const setTabIndex = (index: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        tab: tabs[index],
      }),
    });
  };

  const onMortgageParamsChange = (params: MortgageParams) => {
    setMortgageParams(params);

    const summary = calculateRepayments(params, stampDutyRates);
    setMortgageSummary(summary);

    loadScenario(undefined);
  };

  const onRentParamsChange = (params: RentParams) => {
    setRentParams(params);

    const summary = calculateRent(params);
    setRentSummary(summary);

    loadScenario(undefined);
  };

  useEffect(() => {
    onMortgageParamsChange(mortgageParams);
    onRentParamsChange(rentParams);
  }, []);

  useEffect(() => {
    if (selectedScenario) {
      if (isMortgageScenario(selectedScenario)) {
        setMortgageParams(selectedScenario.params);
        setTabIndex(0);
      } else {
        setRentParams(selectedScenario.params);
        setTabIndex(1);
      }
    }
  }, [selectedScenario]);

  const currentParams = tabIndex === 0 ? mortgageParams : rentParams;
  const currentScenario =
    tabIndex === 0
      ? { params: mortgageParams, summary: mortgageSummary }
      : { params: rentParams, summary: rentSummary };

  return (
    <Container maxWidth="1200px">
      <Heading>Mortgage Calculator</Heading>

      <ScenariosMenu
        currentParams={currentParams}
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        saveScenario={(description) =>
          saveScenario(currentScenario, description)
        }
        loadScenario={loadScenario}
        deleteScenario={deleteScenario}
      />

      <Tabs
        onChange={(index) => {
          setTabIndex(index);
          loadScenario(undefined);
        }}
        index={tabIndex}
      >
        <TabList>
          <Tab>Mortgage</Tab>
          <Tab>Rent</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MortgagePage
              params={mortgageParams}
              onParamsChange={onMortgageParamsChange}
              summary={mortgageSummary}
            />
          </TabPanel>
          <TabPanel>
            <RentPage
              params={rentParams}
              onParamsChange={onRentParamsChange}
              summary={rentSummary}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

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
import { IntlProvider } from "react-intl";
import { ChakraProvider } from "@chakra-ui/react";
import { ScenariosMenu } from "@app/scenarios/components/ScenariosMenu";
import { MortgageParams } from "@entities/mortgages";
import {
  calculateRepayments,
  MortgageSummary,
} from "@usecases/mortgages/calculate_repayments";
import { useSelectedScenarios } from "@app/scenarios/hooks/useSelectedScenario";
import { MortgagePage } from "@app/mortgages/pages/MortgagePage";
import { RentPage } from "@app/rent/pages/RentPage";
import { RentSummary, calculateRent } from "@usecases/rent/calculate_rent";
import { RentParams } from "@entities/rent";
import { isMortgageScenario } from "@entities/scenarios";

function App() {
  const [mortgageSummary, setMortgageSummary] = useState<MortgageSummary>();
  const [mortgageParams, setMortgageParams] = useState<MortgageParams>({
    loan: 100_000,
    rate: 4,
    term: 20,
  });

  const [rentSummary, setRentSummary] = useState<RentSummary>();
  const [rentParams, setRentParams] = useState<RentParams>({
    monthlyRent: 1000,
    interestRate: 3,
    term: 20,
  });

  const [tabIndex, setTabIndex] = useState(0);

  const {
    selectedScenario,
    scenarios,
    saveScenario,
    loadScenario,
    deleteScenario,
  } = useSelectedScenarios(
    tabIndex === 0
      ? { params: mortgageParams, summary: mortgageSummary }
      : { params: rentParams, summary: rentSummary },
  );

  const onMortgageParamsChange = (params: MortgageParams) => {
    setMortgageParams(params);

    const summary = calculateRepayments(params);
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
      console.info(selectedScenario, {
        isMortgage: isMortgageScenario(selectedScenario),
      });
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

  const container = (
    <Container maxWidth="1200px">
      <Heading>Mortgage Calculator</Heading>

      <ScenariosMenu
        currentParams={currentParams}
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        saveScenario={saveScenario}
        loadScenario={loadScenario}
        deleteScenario={deleteScenario}
      />

      <Tabs onChange={setTabIndex} index={tabIndex}>
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

  return (
    <IntlProvider locale={"en"}>
      <ChakraProvider>{container}</ChakraProvider>
    </IntlProvider>
  );
}

export default App;

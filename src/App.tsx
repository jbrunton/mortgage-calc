import { useEffect, useState } from "react";
import {
  Heading,
  Center,
  Button,
  Container,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  DebtChart,
  MonthlyRepaymentsChart,
} from "./app/repayments/components/charts";
import { InputsForm } from "./app/repayments/components/InputsForm";
import { ScenariosMenu } from "./app/scenarios/components/ScenariosMenu";
import { Params } from "@entities/repayments";
import {
  calculateRepayments,
  RepaymentsSummary,
} from "@usecases/repayments/calculate_repayments";
import { useSelectedScenarios } from "./app/scenarios/hooks/useSelectedScenario";
import { SummaryTable } from "@app/repayments/components/SummaryTable";
import { RepaymentsTable } from "@app/repayments/components/RepaymentsTable";

function App() {
  const [summary, setSummary] = useState<RepaymentsSummary>();
  const [currentParams, setCurrentParams] = useState<Params>({
    loan: 100_000,
    rate: 4,
    term: 20,
  });

  const {
    selectedScenario,
    scenarios,
    saveScenario,
    loadScenario,
    deleteScenario,
  } = useSelectedScenarios(currentParams, summary);

  const onParamsChange = (params: Params) => {
    setCurrentParams(params);
    loadScenario(undefined);
  };

  useEffect(() => {
    const summary = calculateRepayments(currentParams);
    setSummary(summary);
  }, [currentParams]);

  useEffect(() => {
    if (selectedScenario) {
      setCurrentParams(selectedScenario.params);
    }
  }, [selectedScenario]);

  const {
    isOpen: isRepaymentsModalOpen,
    onOpen: openRepaymentsModal,
    onClose: closeRepaymentsModal,
  } = useDisclosure();

  return (
    <Container maxWidth="1200px">
      <Heading>Mortgage Calculator</Heading>

      <p>Calculate repayments and interest for a mortgage.</p>

      <ScenariosMenu
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        saveScenario={saveScenario}
        loadScenario={loadScenario}
        deleteScenario={deleteScenario}
      />

      <SimpleGrid columns={2}>
        <InputsForm params={currentParams} onChange={onParamsChange} />
        {summary && <SummaryTable summary={summary} />}
      </SimpleGrid>

      {summary && (
        <SimpleGrid columns={2} mt="24px">
          <MonthlyRepaymentsChart repayments={summary.repayments} />
          <DebtChart repayments={summary.repayments} />
        </SimpleGrid>
      )}

      <Center>
        <Button
          mt="24px"
          variant="ghost"
          onClick={openRepaymentsModal}
          leftIcon={<Search2Icon />}
        >
          View monthly repayments
        </Button>
      </Center>

      <Modal
        onClose={closeRepaymentsModal}
        isOpen={isRepaymentsModalOpen}
        scrollBehavior="inside"
        size="full"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Monthly Repayments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {summary && <RepaymentsTable repayments={summary.repayments} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default App;

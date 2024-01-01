import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { MortgageParamsForm } from "../components/MortgageParamsForm";
import { SummaryTable } from "../components/SummaryTable";
import { MortgageParams, MortgageSummary } from "@entities/mortgages";
import { FC } from "react";
import { DebtChart, MonthlyRepaymentsChart } from "../components/charts";
import { Search2Icon } from "@chakra-ui/icons";
import { RepaymentsTable } from "../components/RepaymentsTable";

type MortgagePageProps = {
  params: MortgageParams;
  summary?: MortgageSummary;
  onParamsChange: (params: MortgageParams) => void;
};

export const MortgagePage: FC<MortgagePageProps> = ({
  params,
  summary,
  onParamsChange,
}) => {
  const {
    isOpen: isRepaymentsModalOpen,
    onOpen: openRepaymentsModal,
    onClose: closeRepaymentsModal,
  } = useDisclosure();

  return (
    <>
      <Heading as="h3" size="sm" mb={8}>
        Calculate repayments and interest for a mortgage
      </Heading>

      <SimpleGrid minChildWidth="320px" spacing="24px">
        <MortgageParamsForm params={params} onChange={onParamsChange} />
        {summary && <SummaryTable summary={summary} />}
      </SimpleGrid>

      {summary && (
        <SimpleGrid minChildWidth="320px" mt="24px" spacing="24px">
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
    </>
  );
};

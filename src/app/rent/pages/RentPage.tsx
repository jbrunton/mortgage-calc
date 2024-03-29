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
import { SummaryTable } from "../components/SummaryTable";
import { FC } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { RentPaymentsTable } from "../components/PaymentsTable";
import { RentParams, RentSummary } from "@entities/rent";
import { RentParamsForm } from "../components/RentParamsForm";
import { RentPaymentsChart, CumulativeRentChart } from "../components/charts";

type RentPageProps = {
  params: RentParams;
  summary?: RentSummary;
  onParamsChange: (params: RentParams) => void;
};

export const RentPage: FC<RentPageProps> = ({
  params,
  summary,
  onParamsChange,
}) => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  return (
    <>
      <Heading as="h3" size="sm" mb={8}>
        Calculate amount spent on rent
      </Heading>

      <SimpleGrid minChildWidth="320px" spacing="24px">
        <RentParamsForm params={params} onChange={onParamsChange} />
        {summary && <SummaryTable summary={summary} />}
      </SimpleGrid>

      {summary && (
        <SimpleGrid minChildWidth="320px" mt="24px" spacing="24px">
          <RentPaymentsChart payments={summary.payments} />
          <CumulativeRentChart payments={summary.payments} />
        </SimpleGrid>
      )}

      <Center>
        <Button
          mt="24px"
          variant="ghost"
          onClick={openModal}
          leftIcon={<Search2Icon />}
        >
          View monthly rent payments
        </Button>
      </Center>

      <Modal
        onClose={closeModal}
        isOpen={isModalOpen}
        scrollBehavior="inside"
        size="full"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Monthly Rent Payments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {summary && <RentPaymentsTable payments={summary.payments} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

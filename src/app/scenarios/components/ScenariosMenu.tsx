import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, PlusSquareIcon, HamburgerIcon } from "@chakra-ui/icons";
import { CurrencyAmount } from "@components/CurrencyAmount";
import { Scenario } from "@entities/scenarios";
import React, { useState } from "react";
import { DeleteScenarioDialog } from "./DeleteScenarioDialog";
import { SaveScenarioDialog } from "./SaveScenarioDialog";

type ScenariosMenuProps = {
  scenarios: Scenario[];
  selectedScenario: Scenario | undefined;
  saveScenario: (name: string | undefined) => void;
  loadScenario: (scenario: Scenario) => void;
  deleteScenario: () => void;
};

export const ScenariosMenu: React.FC<ScenariosMenuProps> = ({
  scenarios,
  selectedScenario,
  saveScenario,
  loadScenario,
  deleteScenario,
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        placement="right"
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Scenarios</DrawerHeader>
          <DrawerBody>
            {scenarios.map((scenario, index) => (
              <LinkBox
                key={`scenario-${index}`}
                onClick={() => {
                  onDrawerClose();
                  loadScenario(scenario);
                }}
                p="1"
                mb="1"
                borderRadius="4"
                backgroundColor={
                  scenario === selectedScenario ? "gray.200" : undefined
                }
                _hover={{ backgroundColor: "gray.100" }}
              >
                <Heading size="xs">
                  <LinkOverlay href="#">{scenario.description}</LinkOverlay>
                </Heading>
                <Text fontSize="xs">
                  Loan: <CurrencyAmount amount={scenario.params.loan} />{" "}
                  &middot; Rate: {scenario.params.rate} &middot; Term:{" "}
                  {scenario.params.term}
                </Text>
                <Text fontSize="xs">
                  Monthly Repayment:{" "}
                  <CurrencyAmount amount={scenario.summary.monthlyAmount} />{" "}
                  &middot; Total Interest:{" "}
                  <CurrencyAmount amount={scenario.summary.totalInterest} />
                </Text>
              </LinkBox>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex minWidth="max-content" mb="8px">
        <div>
          {selectedScenario && (
            <Heading size="lg">
              Scenario: {selectedScenario.description}
            </Heading>
          )}
        </div>

        <Spacer />

        <div>
          {selectedScenario ? (
            <Button
              variant="ghost"
              leftIcon={<DeleteIcon />}
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Scenario
            </Button>
          ) : (
            <Button
              variant="ghost"
              leftIcon={<PlusSquareIcon />}
              onClick={() => setShowSaveDialog(true)}
            >
              Save Scenario
            </Button>
          )}
          <Button
            variant="ghost"
            leftIcon={<HamburgerIcon />}
            onClick={onDrawerOpen}
          >
            Scenarios
          </Button>
        </div>
      </Flex>

      <SaveScenarioDialog
        show={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSubmit={saveScenario}
      />

      <DeleteScenarioDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onSubmit={deleteScenario}
      />
    </>
  );
};

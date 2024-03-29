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
  useDisclosure,
  Stack,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon, PlusSquareIcon, HamburgerIcon } from "@chakra-ui/icons";
import { CurrencyAmount } from "@components/CurrencyAmount";
import { Scenario, isMortgageScenario } from "@entities/scenarios";
import React, { useState } from "react";
import { DeleteScenarioDialog } from "./DeleteScenarioDialog";
import { SaveScenarioDialog } from "./SaveScenarioDialog";
import { getDefaultScenarioName } from "@usecases/scenarios/name_scenario";
import { InputParams } from "@entities/inputs";

type ScenariosMenuProps = {
  currentParams: InputParams;
  scenarios: Scenario[];
  selectedScenario: Scenario | undefined;
  saveScenario: (name: string | undefined) => void;
  loadScenario: (scenario: Scenario) => void;
  deleteScenario: () => void;
};

export const ScenariosMenu: React.FC<ScenariosMenuProps> = ({
  currentParams,
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
          <DrawerCloseButton />
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
                  <LinkOverlay style={{ cursor: "pointer" }}>
                    {scenario.description}
                  </LinkOverlay>
                </Heading>
                {isMortgageScenario(scenario) ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Text fontSize="xs">
                      Rent:{" "}
                      <CurrencyAmount amount={scenario.params.monthlyRent} />{" "}
                      &middot; Interest Rate: {scenario.params.interestRate}{" "}
                      &middot; Term: {scenario.params.term}
                    </Text>
                    <Text fontSize="xs">
                      Final Rent:{" "}
                      <CurrencyAmount
                        amount={scenario.summary.finalMonthlyRent}
                      />{" "}
                      &middot; Total Rent:{" "}
                      <CurrencyAmount amount={scenario.summary.totalRent} />
                    </Text>
                  </>
                )}
              </LinkBox>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Stack direction={["column", "row"]} spacing="24px">
        {selectedScenario && (
          <Heading size="lg">Scenario: {selectedScenario.description}</Heading>
        )}
        <div style={{ marginLeft: "auto" }}>
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
      </Stack>

      {showSaveDialog && (
        <SaveScenarioDialog
          show={showSaveDialog}
          defaultName={getDefaultScenarioName(currentParams)}
          onClose={() => setShowSaveDialog(false)}
          onSubmit={saveScenario}
        />
      )}

      <DeleteScenarioDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onSubmit={deleteScenario}
      />
    </>
  );
};

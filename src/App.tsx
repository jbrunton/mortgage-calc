import { useEffect, useState } from "react";
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

  return (
    <div className="App uk-container">
      <h1>Mortgage Calculator</h1>

      <p className="uk-text-lead">
        Calculate repayments and interest for a mortgage.
      </p>

      <ScenariosMenu
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        saveScenario={saveScenario}
        loadScenaio={loadScenario}
        deleteScenario={deleteScenario}
      />

      <div className="uk-grid">
        <div className="uk-width-1-2">
          <InputsForm params={currentParams} onChange={onParamsChange} />
        </div>
        <div className="uk-width-1-2">
          {summary && <SummaryTable summary={summary} />}
        </div>
      </div>

      {summary && (
        <div className="uk-grid">
          <div className="uk-width-1-2">
            <MonthlyRepaymentsChart repayments={summary.repayments} />
          </div>
          <div className="uk-width-1-2">
            <DebtChart repayments={summary.repayments} />
          </div>
        </div>
      )}

      <div className="uk-section uk-text-center">
        <a data-uk-toggle="target: #modal-example">View monthly repayments</a>
        <div id="modal-example" className="uk-modal-container" data-uk-modal>
          <div className="uk-modal-dialog">
            <button
              className="uk-modal-close-default"
              type="button"
              data-uk-close
            ></button>

            <div className="uk-modal-header">
              <h2 className="uk-modal-title">Monthly Repayments</h2>
            </div>

            <div className="uk-modal-body" data-uk-overflow-auto>
              {summary && <RepaymentsTable repayments={summary.repayments} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

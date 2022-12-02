import { useEffect, useState } from "react";
import { DebtChart, MonthlyRepaymentsChart } from "./components/charts";
import { InputsForm } from "./components/InputsForm";
import { RepaymentsTable } from "./components/RepaymentsTable";
import { ScenariosMenu } from "./components/ScenariosMenu";
import { SummaryTable } from "./components/SummaryTable";
import { useSelectedScenarios } from "./hooks/useSelectedScenario";
import { calculateRepayments, Params, RepaymentsSummary } from "./repayments";

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
  } = useSelectedScenarios(currentParams);

  const onParamsChange = (params: Params) => {
    console.log("onParamsChange");
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

import { fmt } from "./utils";
import { useTracker } from "./hooks";
import { TbCoins } from "solid-icons/tb";

const App = () => {
  const { store } = useTracker();

  return (
    <div class="w-lvw h-lvh flex flex-col bg-neutral-50 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 overflow-hidden">
      <header class="flex flex-row items-center gap-1 p-4 border-b border-neutral-200 shadow-xs">
        <TbCoins class="w-5 h-5" />
        <h1>cryptochronicler</h1>
        <nav>
          {
            <ul>
              <li></li>
            </ul>
          }
        </nav>
      </header>
      <main class="flex-1 flex flex-col overflow-y-auto p-2 gap-2">
        {Object.values(store).map(
          (trade) =>
            trade && (
              <div class="flex flex-col border border-neutral-200 shadow rounded-lg p-4">
                <div class="flex flex-row items-center justify-between">
                  <h2 class="font-extrabold text-xl">{trade.s}</h2>
                  <p class="text-xs font-extralight">trade: {trade.t}</p>
                </div>
                <div class="flex flex-row items-center pb-4 pt-2">
                  <span class="flex-1">
                    <p class="text-xs font-normal">Amount</p>
                    <h4 class="text-lg">{trade.q}</h4>
                  </span>
                  <span class="flex-1">
                    <p class="text-xs font-normal">Paid</p>
                    <h4 class="text-lg">
                      {fmt(Number(trade.p) * Number(trade.q))}
                    </h4>
                  </span>
                </div>
                <h3 class="text-2xl font-bold">{fmt(trade.p)}</h3>
              </div>
            )
        )}
      </main>
    </div>
  );
};

export default App;

function Popup(props) {
  const {
    left,
    top,
    state,
    medianHouseholdIncome,
    incomePercentile,
    handleClose,
  } = props;

  const Title = ({ children }) => (
    <span className="text-yellow-200 font-semibold">{children}</span>
  );

  return (
    <div
      className="fixed z-20 bg-slate-700/60 text-white p-4 text-xl"
      style={{ left, top }}
    >
      <div className="flex justify-between">
        <h2 className="capitalize text-2xl mb-4">summary data</h2>
        <button
          className="hover:text-yellow-300 ease-in-out duration-300"
          name="close"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <div>
        <Title>State:</Title> {state}
      </div>
      <div>
        <Title>Median Household Income:</Title> {medianHouseholdIncome}
      </div>
      <div>
        <Title>Percentile:</Title> {incomePercentile}
      </div>
    </div>
  );
}

export default Popup;

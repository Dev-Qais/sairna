import { useState } from "react";

import ResultsBody from "./components/ResultsBody";
import ResultsHeading from "./components/ResultsHeading";
import BookingFlow from "./components/booking/BookingFlow";

import useSearchStore from "../../store/useSearchStore";

function ResultsPage() {
  const [selectedTrip, setSelectedTrip] = useState(null);

  const searchData = useSearchStore((state) => state.searchData);

  const passengerCount = Number(searchData?.passengers) || 1;

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
  };

  const handleBackToResults = () => {
    setSelectedTrip(null);
  };

  return (
    <>
      {!selectedTrip ? (
        <>
          <ResultsHeading />
          <ResultsBody onSelectTrip={handleSelectTrip} />
        </>
      ) : (
        <BookingFlow
          trip={selectedTrip}
          passengerCount={passengerCount}
          onBack={handleBackToResults}
        />
      )}
    </>
  );
}

export default ResultsPage;

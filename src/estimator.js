const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType } = data;
  const currentlyInfected1 = reportedCases * 10;
  const currentlyInfected2 = reportedCases * 50;
  let multiplier;
  if (periodType === 'weeks') {
    multiplier = 0;
  } else if (periodType === 'months') {
    multiplier = 0;
  } else {
    multiplier = 0;
  }
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: currentlyInfected1 * (2 ** (multiplier / 3))
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: currentlyInfected2 * (2 ** (multiplier / 3))
    }
  };
};
export default covid19ImpactEstimator;

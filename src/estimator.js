const covid19ImpactEstimator = (data) => {
  const { timeToElapse, periodType } = data;
  const currentlyInfected1 = 1;
  const currentlyInfected2 = 1;
  let multiplier;
  if (periodType === 'weeks') {
    multiplier = timeToElapse * 7;
  } else if (periodType === 'months') {
    multiplier = timeToElapse * 30;
  } else {
    multiplier = timeToElapse;
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

/* eslint linebreak-style: ["error", "windows"] */
const covid19ImpactEstimator = (data) => {
  const inputData = data;
  const { reportedCases } = inputData;
  const currentlyInfected1 = reportedCases * 10;
  const currentlyInfected2 = reportedCases * 50;
  return {
    data: inputData,
    impact: {
      currentlyInfected2,
      infectionsByRequestedTime: currentlyInfected1 * 1024
    },
    severeImpact: {
      currentlyInfected2,
      infectionsByRequestedTime: currentlyInfected2 * 1024
    }
  };
};
export default covid19ImpactEstimator;

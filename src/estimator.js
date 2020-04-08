const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
  const currentlyInfected1 = reportedCases * 10;
  const currentlyInfected2 = reportedCases * 50;
  let multiplier;
  if (periodType === 'months') {
    multiplier = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    multiplier = timeToElapse * 7;
  } else if (periodType === 'days') {
    multiplier = timeToElapse;
  } else {
    multiplier = 1;
  }
  const impactInfections = currentlyInfected1 * (2 ** (Math.round(multiplier / 3)));
  const severeImpactInfections = currentlyInfected2 * (2 ** (Math.round(multiplier / 3)));

  const impactICUCases = 0.05 * impactInfections;
  const severeImpactICUCases = 0.05 * severeImpactInfections;

  const impactVentilatorCases = 0.02 * impactInfections;
  const severeImpactVentilatorCases = 0.02 * severeImpactInfections;

  const impactSevereCases = 0.15 * impactInfections;
  const severeImpactSevereCases = 0.15 * severeImpactInfections;

  const impactEconomicLoss = (impactInfections * avgDailyIncomePopulation)
    * avgDailyIncomeInUSD * multiplier;
  const severeImpactEconomicLoss = (severeImpactInfections * avgDailyIncomePopulation)
    * avgDailyIncomeInUSD * multiplier;

  const availableHospitalBeds = 0.35 * totalHospitalBeds;
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: impactInfections,
      severeCasesByRequestedTime: impactSevereCases,
      hospitalBedsByRequestedTime: availableHospitalBeds - impactSevereCases,
      casesForICUByRequestedTime: impactICUCases,
      casesForVentilatorsByRequestedTime: impactVentilatorCases,
      dollarsInFlight: impactEconomicLoss
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: severeImpactInfections,
      severeCasesByRequestedTime: severeImpactSevereCases,
      hospitalBedsByRequestedTime: availableHospitalBeds - severeImpactSevereCases,
      casesForICUByRequestedTime: severeImpactICUCases,
      casesForVentilatorsByRequestedTime: severeImpactVentilatorCases,
      dollarsInFlight: severeImpactEconomicLoss
    }
  };
};

export default covid19ImpactEstimator;

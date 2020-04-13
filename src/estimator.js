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
  let infectedPeriod;

  if (periodType === 'months') {
    infectedPeriod = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    infectedPeriod = timeToElapse * 7;
  } else if (periodType === 'days') {
    infectedPeriod = timeToElapse;
  }

  const impactInfections = currentlyInfected1 * (2 ** Math.trunc(infectedPeriod / 3));
  const severeImpactInfections = currentlyInfected2 * (2 ** Math.trunc(infectedPeriod / 3));

  const impactICUCases = Math.trunc(0.05 * impactInfections);
  const severeImpactICUCases = Math.trunc(0.05 * severeImpactInfections);

  const impactVentilatorCases = Math.trunc(0.02 * impactInfections);
  const severeImpactVentilatorCases = Math.trunc(0.02 * severeImpactInfections);

  const impactSevereCases = 0.15 * impactInfections;
  const severeImpactSevereCases = 0.15 * severeImpactInfections;

  const impactEconomicLoss = Math.trunc((impactInfections * avgDailyIncomePopulation
    * avgDailyIncomeInUSD) / infectedPeriod);
  const severeImpactEconomicLoss = Math.trunc((severeImpactInfections * avgDailyIncomePopulation
    * avgDailyIncomeInUSD) / infectedPeriod);

  const availableHospitalBeds = 0.35 * totalHospitalBeds;
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: impactInfections,
      severeCasesByRequestedTime: impactSevereCases,
      hospitalBedsByRequestedTime: Math.trunc(availableHospitalBeds - impactSevereCases),
      casesForICUByRequestedTime: impactICUCases,
      casesForVentilatorsByRequestedTime: impactVentilatorCases,
      dollarsInFlight: impactEconomicLoss
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: severeImpactInfections,
      severeCasesByRequestedTime: severeImpactSevereCases,
      hospitalBedsByRequestedTime: Math.trunc(availableHospitalBeds - severeImpactSevereCases),
      casesForICUByRequestedTime: severeImpactICUCases,
      casesForVentilatorsByRequestedTime: severeImpactVentilatorCases,
      dollarsInFlight: severeImpactEconomicLoss
    }
  };
};

export default covid19ImpactEstimator;

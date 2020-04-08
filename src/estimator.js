const covid19ImpactEstimator = (data) => {
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const currentlyInfected1 = reportedCases * 10;
  const currentlyInfected2 = reportedCases * 50;
  let multiplier;
  // Manage the periodType and depends whether it has values of
  // either days weeks or months, then makes appropriate conversion to days.
  if (periodType === 'months') {
    multiplier = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    multiplier = timeToElapse * 7;
  } else if (periodType === 'days') {
    multiplier = timeToElapse;
  } else {
    multiplier = 1;
  }
  const impactInfections = Math.round(currentlyInfected1 * (2 ** (multiplier / 3)));
  const severeImpactInfections = Math.round(currentlyInfected2 * (2 ** (multiplier / 3)));
  const impactSevereCases = 0.15 * impactInfections;
  const severeImpactSevereCases = 0.15 * severeImpactInfections;
  const availableHospitalBeds = 0.35 * totalHospitalBeds;
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: impactInfections,
      severeCasesByRequestedTime: impactSevereCases,
      hospitalBedsByRequestedTime: availableHospitalBeds - impactSevereCases
    },
    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: severeImpactInfections,
      severeCasesByRequestedTime: severeImpactSevereCases,
      hospitalBedsByRequestedTime: availableHospitalBeds - severeImpactSevereCases
    }
  };
};

export default covid19ImpactEstimator;

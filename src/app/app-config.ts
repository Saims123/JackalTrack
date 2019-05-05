export const JackaLConfig = {
         JackalNestURL: 'https://i7467177.bucomputing.uk/node',
         JackalNestURLProd: 'https://i7467177.bucomputing.uk/node',
         JackalTrackDevURL: 'http://localhost:4200',
         JackalTrackProdURL: 'https://i7467177.bucomputing.uk'
       };

export const JackalNestAPI = {
  Student: `${JackaLConfig.JackalNestURL}/student`,
  SupervisionGroup: `${JackaLConfig.JackalNestURL}/group`,
  Timeslots: `${JackaLConfig.JackalNestURL}/timeslots`,
  MeetingNotes: `${JackaLConfig.JackalNestURL}/notes`
};

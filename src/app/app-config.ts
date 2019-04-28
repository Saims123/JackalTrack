export const JackaLConfig = {
         JackalNestURL: 'http://localhost:40030',
         JackalNestURLProd: 'https://i7467177.bucomputing.uk/node'
       };
export const JackalNestAPI = {
  Student: `${JackaLConfig.JackalNestURL}/student`,
  SupervisionGroup: `${JackaLConfig.JackalNestURL}/group`,
  Timeslots: `${JackaLConfig.JackalNestURL}/timeslots`,
  MeetingNotes: `${JackaLConfig.JackalNestURL}/notes`
};

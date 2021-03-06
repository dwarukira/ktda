import { gql } from "apollo-boost";

export const BasicAnalysis = gql`
  query BasicAnalysis {
    basicAnalysis {
      totalAlumni
      totalAmmount
      totalStudents
      totalUniversityTransation
    }
  }
`;


export const GetUniversityTransation = gql`
  query UniversityTransation {
    universityTransation {
      year
      total
    }
  }
`;
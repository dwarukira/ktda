import { gql } from "apollo-boost";

export const GetGenderParity = gql`
  query GenderParity {
    genderParity {
      totalMales
      totalFemales
      totalOthers
    }
  }
`;

export const GetGenderGradeDistribution = gql`
  query GetGenderGradeDistribution {
    genderGradeDistribution {
      grade
      totalOthers
      totalMales
      totalFemales
    }
  }
`;

export const GetUniversityTransationGender = gql`
  query UniversityTransationGender {
    universityTransationGender {
      year
      totalMales
      totalFemales
      totalOthers
    }
  }
`;

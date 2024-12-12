import { ApiCommon, ApiCreateEdit } from "../types/apiTypes";
import { UserSchema } from "../types/schemas";

export function mapData(data: UserSchema): ApiCreateEdit {
  const common: ApiCommon = {
    name: data.name,
    email: data.email,
    formetEmploymentPeriod: [
      data.formetEmploymentPeriod[0].toString(),
      data.formetEmploymentPeriod[1].toString(),
    ],
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    skills: data.skills,
    states: data.states,
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  };

  switch (data.variant) {
    case 'create' : {
      return { ...common, variant: data.variant };
    }
    case "edit": {
      return { ...common, id: data.id, variant: data.variant };
    }
  }
}

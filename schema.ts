import { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import {
  checkbox,
  password,
  relationship,
  text,
} from "@keystone-6/core/fields";

export const lists: Lists = {
  User: list({
    fields: {
      email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      password: password({ validation: { isRequired: true } }),
    },
  }),
  Attendant: list({
    fields: {
      firstName: text({
        validation: { isRequired: true },
      }),
      lastName: text({
        validation: { isRequired: true },
      }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      phone: text({
        validation: { isRequired: true },
      }),
      congregation: relationship({ ref: "Congregation.publishers" }),
      keyman: relationship({ ref: "Department.keyman" }),
      department: relationship({ ref: "Department.attendants" }),
      badgeIsCheckedIn: checkbox({ defaultValue: false }),
    },
    ui: {
      labelField: "lastName",
      listView: {
        initialColumns: [
          "lastName",
          "firstName",
          "phone",
          "badgeIsCheckedIn",
          "department",
        ],
      },
    },
  }),
  Department: list({
    fields: {
      name: text({
        validation: { isRequired: true },
      }),
      keyman: relationship({ ref: "Attendant.keyman" }),
      attendants: relationship({ ref: "Attendant.department", many: true }),
    },
  }),
  Congregation: list({
    fields: {
      name: text({
        validation: { isRequired: true },
      }),
      publishers: relationship({ ref: "Attendant.congregation", many: true }),
    },
  }),
};

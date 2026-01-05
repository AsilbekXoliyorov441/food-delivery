import faker from "faker";

export const generateId = () => faker.datatype.uuid();
export const recentDate = () => faker.date.recent();
export default faker;

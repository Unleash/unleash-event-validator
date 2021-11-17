import { validator } from "../index";

test("Should be able to parse a valid event", () => {
  const event = {
    eventType: "getVariant",
    eventId: "944a337d-fe30-42f2-9316-da1e12104018",
    variant: "",
    context: { userId: "1234" },
    enabled: false,
    featureName: "travel.landing",
  };
  expect(validator(event)).toBeTruthy();
});

test("Parsing an invalid event gives false", () => {
  const event = {
    eventType: "invalidEventType",
    eventId:"nonUUID"
  }
  validator(event)
  expect(validator(event)).toBeFalsy();
})

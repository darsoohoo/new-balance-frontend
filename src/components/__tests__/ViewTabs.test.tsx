import * as React from "react";
import { render, screen } from "@testing-library/react";
import ViewTabs from "../ViewTabs";
import mockData from "../../../../mockDataTs";

const selectedTab = "Purchases";
const handleTabChange = jest.fn();

test("it should render a table ", () => {
  const container = render(<ViewTabs handleTabChange={handleTabChange} selectedTab={selectedTab} />).container;

  const tabs = screen.getByRole("tabs");
  console.log("container view tabs!!!", tabs);
  expect(tabs).toBe("tabs");
});

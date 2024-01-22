import Dashboard from "./Dashboard";
import { render, screen } from "@testing-library/react";

describe("#Dashboard", () => {
  it("shows dashboard title", () => {
    render(<Dashboard />);
    screen.debug();
    const title = screen.getByText(/dashboard/i);
    expect(title).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import UserNav from "./UserNav";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../contexts/user-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let adminUser = {
  id: 1,
  email: "admin@test.com",
  created_at: "2024-12-03T19:35:36.449Z",
  name: "Admin",
  roles: ["user", "manager", "admin"],
  created_date: "12/03/2024",
  views: {},
};

function renderUserNavComp(user = null, setUser = null) {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <UserNav />
      </UserContext.Provider>
    </QueryClientProvider>,
    { wrapper: MemoryRouter }
  );
}

describe("UserNav component", () => {
  test("Renders sign in link without a user", () => {
    // Render user nav
    renderUserNavComp();
    // Expect the links to be there.
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.queryByText("Signed in as: Admin")).not.toBeInTheDocument();
  });

  test("Renders `Signed in as...` text when a user is present", () => {
    renderUserNavComp(adminUser);
    expect(screen.getByText("Signed in as: Admin")).toBeInTheDocument();
  });
});

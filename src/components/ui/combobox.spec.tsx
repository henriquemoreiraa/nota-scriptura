import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Combobox, Options } from "./combobox";
import userEvent from "@testing-library/user-event";

interface ComboboxTestProps {
  multiple?: boolean;
  values?: Options;
  disabled?: boolean;
}

describe("Combobox", () => {
  const user = userEvent.setup();

  const renderCombobox = (props?: ComboboxTestProps) => {
    return render(
      <Combobox
        options={[
          { value: "test_value", label: "Test Label" },
          { value: "test_value_2", label: "Test Label 2" },
        ]}
        name="Test Name"
        placeholder="Selecione um test name"
        {...props}
      />
    );
  };

  it("should render with placeholder", () => {
    renderCombobox();
    expect(screen.getByTestId("combobox-btn")).toHaveTextContent(
      "Selecione um test name"
    );
  });

  it("should render options when button is clicked", async () => {
    renderCombobox();

    await user.click(screen.getByTestId("combobox-btn"));

    expect(screen.getByText("Test Label"));
    expect(screen.getByText("Test Label 2"));
  });

  it("should render label when option is clicked", async () => {
    renderCombobox();
    await user.click(screen.getByTestId("combobox-btn"));
    await user.click(screen.getByTestId("test_value"));

    expect(screen.getByTestId("combobox-btn")).toHaveTextContent("Test Label");
  });

  it("should render multiple values when options are clicked", async () => {
    renderCombobox({ multiple: true });
    await user.click(screen.getByTestId("combobox-btn"));
    await user.click(screen.getByTestId("test_value"));
    await user.click(screen.getByTestId("test_value_2"));

    const multipleDivs = screen.getAllByTestId("multiple-div");

    expect(multipleDivs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          className: expect.stringContaining(
            "bg-zinc-100 px-2 py-1 rounded-sm"
          ),
        }),
      ])
    );
    expect(multipleDivs.map((div) => div.textContent)).toEqual(
      expect.arrayContaining(["Test Label", "Test Label 2"])
    );
  });

  it("should unselect option", async () => {
    renderCombobox();
    await user.click(screen.getByTestId("combobox-btn"));
    await user.click(screen.getByTestId("test_value"));
    await user.click(screen.getByTestId("combobox-btn"));
    await user.click(screen.getByTestId("test_value"));

    expect(screen.getByTestId("combobox-btn")).toHaveTextContent(
      "Selecione um test name"
    );
  });

  it("should unselect option when multiple", async () => {
    renderCombobox({ multiple: true });
    await user.click(screen.getByTestId("combobox-btn"));
    await user.click(screen.getByTestId("test_value"));
    await user.click(screen.getByTestId("test_value_2"));
    await user.click(screen.getByTestId("test_value"));

    expect(screen.getByTestId("combobox-btn")).toHaveTextContent(
      "Test Label 2"
    );
  });

  it("should render with default value", async () => {
    renderCombobox({ values: [{ value: "test_value", label: "Test Label" }] });
    expect(screen.getByTestId("combobox-btn")).toHaveTextContent("Test Label");
  });
});

import { cn } from "../../lib/utils";

describe("cn utility", () => {
  it("should merge standard classes", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should resolve tailwind class conflicts", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    expect(cn("text-sm", "text-lg", "text-base")).toBe("text-base");
  });

  it("should handle conditional inputs and falsy values", () => {
    expect(cn("class1", undefined, "class2")).toBe("class1 class2");
    expect(cn("class1", null, "class2")).toBe("class1 class2");
    expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
    expect(cn("class1", true && "class2")).toBe("class1 class2");
  });

  it("should support array inputs", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
    expect(cn(["p-4", "p-8"])).toBe("p-8"); // testing inner resolution
  });

  it("should support object inputs", () => {
    expect(cn({ "class1": true, "class2": false })).toBe("class1");
    expect(cn({ "bg-red-500": true, "bg-blue-500": true })).toBe("bg-blue-500"); // conflicts in objects
  });

  it("should handle complex combinations", () => {
    expect(
      cn(
        "p-4",
        ["m-2", "m-4"],
        { "text-red-500": true, "text-blue-500": false },
        "bg-gray-100",
        undefined,
        "p-8"
      )
    ).toBe("m-4 text-red-500 bg-gray-100 p-8");
  });
});

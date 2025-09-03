import { describe, it, expect } from "@jest/globals";
import { filter } from "./filter.js";
import trades from "../fixtures/trades.json" with { type: "json" };

describe("filter", () => {
  it("should filter trades by ID", () => {
    // Arrange
    const query = { id: "2813414897" };

    // Act
    const result = filter(trades, query);

    // Assert
    expect(result).toEqual(trades.filter((trade) => trade.t === 2813414897));
  });

  it("should filter trades by quantity at least", () => {
    // Arrange
    const query = { atleast: "10" };

    // Act
    const result = filter(trades, query);

    // Assert
    expect(result).toEqual(trades.filter((trade) => Number(trade.q) >= 10));
  })

  it("should filter trades by quantity at most", () => {
    // Arrange
    const query = { atmost: "5" };

    // Act
    const result = filter(trades, query);

    // Assert
    expect(result).toEqual(trades.filter((trade) => Number(trade.q) <= 5));
  })

  it("should filter trades by price above", () => {
    // Arrange
    const query = { above: "1000" };

    // Act
    const result = filter(trades, query);

    // Assert
    expect(result).toEqual(trades.filter((trade) => Number(trade.p) > 1000));
  })

  it("should filter trades by price below", () => {
    // Arrange
    const query = { below: "100" };

    // Act
    const result = filter(trades, query);

    // Assert
    expect(result).toEqual(trades.filter((trade) => Number(trade.p) < 100));
  })

  it("should filter trades by timestamp since", () => {
    // Arrange
    const query = { since: "1678901234567" };

    // Act
    const result = filter(trades, query);

    // Assert
    expect(result).toEqual(trades.filter((trade) => trade.E > 1678901234567));
  })

  it("should filter trades by timestamp prior", () => {
    // Arrange
    const query = { prior: "1678901234568" };

    // Act
    const result = filter(trades, query);

    // Assert
    expect(result).toEqual(trades.filter((trade) => trade.E < 1678901234568));
  })
});
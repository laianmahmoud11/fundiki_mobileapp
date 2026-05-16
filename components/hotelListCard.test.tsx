/// <reference types="jest" />

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import HotelListCard from "./hotelList-card";

const jestMock = (globalThis as any).jest;

jestMock.mock("expo-router", () => {
  const React = require("react");
  return {
    router: { push: jestMock.fn() },
    useFocusEffect: (cb: any) => React.useEffect(cb, []),
  };
});

jestMock.mock("@/contexts/DataContext", () => ({
  useData: () => ({
    savedHotels: [],
    addSavedHotel: jestMock.fn(),
    removeSavedHotel: jestMock.fn(),
  }),
}));

jestMock.mock("@/services/firebaseconfig", () => ({
  auth: { currentUser: { uid: "test-user", isAnonymous: false } },
}));

jestMock.mock("react-native-ratings", () => ({
  Rating: (props: any) => <></>,
}));

jestMock.mock("@expo/vector-icons", () => ({
  Ionicons: (props: any) => <></>,
}));

describe("HotelListCard", () => {
  const defaultProps = {
    id: "hotel-123",
    name: "Grand Palace Hotel",
    country: "Jordan",
    city: "Amman",
    street: "King Abdullah St",
    price: 150,
    starRating: 4.5,
    image: "https://example.com/hotel.jpg",
    description: "Luxury room with city view",
    isFavorite: false,
    onFavoriteChange: jestMock.fn(),
  };

  it("renders hotel name and price", () => {
    render(<HotelListCard {...defaultProps} />);

    expect(screen.getByText("Grand Palace Hotel")).toBeTruthy();
    expect(screen.getByText("$150")).toBeTruthy();
  });

  it("renders location details", () => {
    render(<HotelListCard {...defaultProps} />);

    expect(screen.getByText("Jordan")).toBeTruthy();
    expect(screen.getByText("Amman")).toBeTruthy();
    expect(screen.getByText("King Abdullah St")).toBeTruthy();
  });

  it("passes image URI to Image component", () => {
    render(<HotelListCard {...defaultProps} />);

    const image = screen.getByTestId("hotel-image"); 
    expect(image.props.source).toEqual({ uri: "https://example.com/hotel.jpg" });
  });

  it("calls onFavoriteChange when heart icon is pressed", () => {
    const mockOnFavoriteChange = jest.fn();
    render(<HotelListCard {...defaultProps} onFavoriteChange={mockOnFavoriteChange} />);

    const heartIcon = screen.getByTestId("favorite-icon"); 
    fireEvent.press(heartIcon);

    expect(mockOnFavoriteChange).toHaveBeenCalled();
  });

  it("navigates to hotel details with correct id", () => {
    const { router } = require("expo-router");
    render(<HotelListCard {...defaultProps} />);

    const card = screen.getByTestId("hotel-card-pressable"); 
    fireEvent.press(card);

    expect(router.push).toHaveBeenCalledWith("/hotel-details/hotel-123");
  });
});
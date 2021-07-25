const initState = {
  events: [
    {
      lat: "12",
      lng: "12",
      name: "12",
      startDate: "121212-12-12T11:21",
      endDate: "121212-12-12T00:12",
      description: "12",
    },
    {
      lat: "32",
      lng: "112",
      name: "hello",
      startDate: "121212-12-12T11:21",
      endDate: "121212-12-12T00:12",
      description: "i don't know",
    },
    {
      lat: "4",
      lng: "832",
      name: "copy cat",
      startDate: "121212-12-12T11:21",
      endDate: "121212-12-12T00:12",
      description: "tis the season",
    },
  ],
};

const eventReducer = (state = initState, action) => {
  return state;
};

export default eventReducer;

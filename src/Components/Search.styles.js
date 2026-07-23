export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "gray" : "white",
    color: "black",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

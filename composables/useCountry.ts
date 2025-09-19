export const useCountry = () => {
  const country = useState<string>("app-country", () => "PL");

  const setCountry = (newCountry: string) => {
    country.value = newCountry;
  };

  return {
    country: readonly(country),
    setCountry,
  };
};

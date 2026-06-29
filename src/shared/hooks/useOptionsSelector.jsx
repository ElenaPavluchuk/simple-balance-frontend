import { useState, useEffect } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useOptionsSelector({ queryKey, queryFn, defOption }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [allOptions, setAllOptions] = useState([]);
  const [isOptionsLoading, setIsOptionsLoading] = useState(false);
  const [optionsApiError, setOptionsApiError] = useState("");

  useEffect(() => {
    let didCancel = false;

    const getOptions = async () => {
      setIsOptionsLoading(true);

      try {
        const result = await queryFn();

        if (didCancel) return;

        const normalizedOptions = result.map((option) => ({
          label: option.name,
          value: option.id,
        }));

        setAllOptions(normalizedOptions || []);

        const defaultOption = normalizedOptions.find(
          (option) => option.label === defOption,
        );

        setSelectedOption(defaultOption || null);
      } catch (err) {
        if (didCancel) return;
        console.error(err);
        setOptionsApiError(
          getErrorMessage(err, "Options not loaded. Please try again"),
        );
      } finally {
        setIsOptionsLoading(false);
      }
    };

    getOptions();

    return () => {
      didCancel = true;
    };
  }, [...queryKey]);

  return {
    selectedOption,
    setSelectedOption,
    allOptions,
    isOptionsLoading,
    optionsApiError,
  };
}

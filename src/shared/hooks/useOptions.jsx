import { useState, useEffect } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useOptions({ queryKey, queryFn, initialData }) {
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

        const option =
          normalizedOptions.find((o) => o.value === initialData) ??
          normalizedOptions.find((o) => o.label === initialData) ??
          null;

        setSelectedOption(option);
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

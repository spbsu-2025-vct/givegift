
import React from "react";
import Slider from "@mui/material/Slider";
import { TextField } from "@mui/material";
import styles from "./RangeSlider.module.css";
import { maxPrice, minPrice } from "../../../utils/constants";

export interface RangeSliderProps {
  priceRangeValue: number[];
  handlePriceRangeChange: (
    event: Event | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: number[]
  ) => void;
}

export default function RangeSlider({
  priceRangeValue,
  handlePriceRangeChange,
}: RangeSliderProps) {
  return (
    <div className={styles.range_slider_content}>
      <Slider
        getAriaLabel={() => "range_slider"}
        value={priceRangeValue}
        onChange={handlePriceRangeChange}
        min={minPrice}
        max={maxPrice}
      />
      <div className={styles.range_slider_inputs}>
        <TextField
          label="от"
          type="number"
          variant="outlined"
          slotProps={{
            inputLabel: { shrink: true }
          }}
          sx={{ width: "100px" }}
          size="small"
          value={priceRangeValue[0].toString()}
          onChange={(e) =>
            handlePriceRangeChange(e, [
              Number(e.target.value),
              priceRangeValue[1],
            ])
          }
        />
        <TextField
          label="до"
          type="number"
          variant="outlined"
          slotProps={{
            inputLabel: { shrink: true }
          }}
          sx={{ width: "100px" }}
          size="small"
          value={priceRangeValue[1].toString()}
          onChange={(e) =>
            handlePriceRangeChange(e, [
              priceRangeValue[0],
              Number(e.target.value),
            ])
          }
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "./src/components/Button";
import { Display } from "./src/components/Display";

export default function App() {
  const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  };

  const [calculator, setCalculator] = useState({ ...initialState });

  function addDigit(n) {
    const clearDisplay = calculator.displayValue === "0" || calculator.clearDisplay;

    if (n === "." && !clearDisplay && calculator.displayValue.includes(".")) {
      return;
    }

    const currentValue = clearDisplay ? "" : calculator.displayValue;
    const displayValue = currentValue + n;

    setCalculator((prevState) => ({ ...prevState, displayValue, clearDisplay: false }));

    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...calculator.values];
      values[calculator.current] = newValue;
      setCalculator((prevState) => ({ ...prevState, values }));
    }
  }

  function clearMemory() {
    setCalculator({ ...initialState });
  }

  function setOperation(operation) {
    if (calculator.current === 0) {
      setCalculator((prevState) => ({ ...prevState, operation, current: 1, clearDisplay: true }));
    } else {
      const equals = operation === "=";
      const values = [...calculator.values];

      try {
        values[0] = eval(`${values[0]} ${calculator.operation} ${values[1]}`);
      } catch {
        values[0] = calculator.values[0];
      }

      values[1] = 0;
      setCalculator((prevState) => ({
        ...prevState,
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        currentValue: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      }));
    }
  }

  return (
    <View style={styles.container}>
      <Display value={calculator.displayValue} />

      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

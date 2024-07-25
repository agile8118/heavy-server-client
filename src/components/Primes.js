import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import alert from "../lib/alert";
import t from "../lib/tokens";

const Primes = () => {
  const [count, setCount] = useState("");
  const [primes, setPrimes] = useState(null);
  const [time, setTime] = useState(null);
  const [start, setStart] = useState("100000000000");
  const [formLoading, setFormLoading] = useState(false); // loading for the form submission

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setTime(null);
    setPrimes(null);

    try {
      /** @API call */
      const { data } = await axios.get(
        `/api/primes?count=${count}&start=${start}`,
        { count }
      );
      setPrimes(data.primes);

      setTime(data.time);
      alert(t.alert.success.primes.generated, "success");
    } catch (e) {
      alert(e.response.data.message, "error");
    }
    setFormLoading(false);
  };

  return (
    <div className="profile-container">
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <Input
            type="text"
            label="Starting Number"
            value={start}
            onChange={(value) => {
              setStart(value);
            }}
          />
        </div>

        <div className="form-group">
          <Input
            type="text"
            label="Count"
            value={count}
            onChange={(value) => {
              setCount(value);
            }}
          />
        </div>

        <div className="form-group u-flex-text-right">
          <Button color="blue" type="submit" loading={formLoading}>
            Generate
          </Button>
        </div>
      </form>

      {primes && (
        <div className="primes-container">
          <h3>Generated Prime Numbers:</h3>
          <div className="primes">
            {primes.map((prime, index) => (
              <div key={index} className="primes__item">
                {prime}
              </div>
            ))}
          </div>
          {time && (
            <div className="prime__time">Time taken to generate: {time}s</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Primes;

import { useState, useRef } from "react";

type props = {
  dataLogger: dataLogger;
};

type dataLogger = {
  balance: string;
  created_at: string;
  customer_id: number;
  id: number;
  status: string;
  tax: string;
  total: string;
  updated_at: string;
  user_id: number;
};

export default function FormTotalDetails({ dataLogger }: props) {
  return (
    <>
      <div className="panel">
        <div className="panel-heading">
          <h3>Totals</h3>
        </div>
      </div>
    </>
  );
}

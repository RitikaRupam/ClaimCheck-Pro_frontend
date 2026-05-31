import React from "react";
import { processClaims } from "../api";

function Upload() {
  const uploadSample = async () => {
    const sample = [
      {
        claimId: "C1",
        patientId: "P1",
        procedureCode: "PROC01",
        amount: 5000,
        status: "SUBMITTED",
      },
      {
        claimId: "C2",
        patientId: "P2",
        procedureCode: "",
        amount: 3000,
        status: "SUBMITTED",
      },
      {
        claimId: "C3",
        patientId: "P3",
        procedureCode: "PROC02",
        amount: -100,
        status: "SUBMITTED",
      },
      {
        claimId: "C4",
        patientId: "P4",
        procedureCode: "ABC",
        amount: 7000,
        status: "SUBMITTED",
      },
    ];

    await processClaims(sample);
    alert("Claims Processed!");
    window.location.reload();
  };

  return (
    <button
      onClick={uploadSample}
      style={{
        padding: "10px 20px",
        background: "blue",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Upload Sample Claims
    </button>
  );
}

export default Upload;
